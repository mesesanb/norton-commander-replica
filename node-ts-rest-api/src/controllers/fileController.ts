import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const HOME_ROOT = path.resolve(process.env.HOME || process.env.USERPROFILE || '/');

const isWithinAllowedRoot = (resolvedPath: string) => {
  const relative = path.relative(HOME_ROOT, resolvedPath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
};

// convert incoming client path into a safe absolute path under home.
const resolveSafePath = (inputPath: string): string | null => {
  const trimmed = inputPath.trim();
  if (!trimmed) {
    return null;
  }

  // in this app, '/' and '/folder' are virtual paths rooted at HOME_ROOT.
  if (trimmed === '/') {
    return HOME_ROOT;
  }

  let resolved: string;
  if (path.isAbsolute(trimmed)) {
    const normalized = path.resolve(trimmed);
    const isHomeAbsolute = normalized === HOME_ROOT || normalized.startsWith(`${HOME_ROOT}${path.sep}`);
    resolved = isHomeAbsolute ? normalized : path.resolve(HOME_ROOT, `.${trimmed}`);
  } else {
    resolved = path.resolve(HOME_ROOT, trimmed);
  }

  return isWithinAllowedRoot(resolved) ? resolved : null;
};

const toClientPath = (absolutePath: string): string => {
  const relative = path.relative(HOME_ROOT, absolutePath);
  if (!relative || relative === '.') {
    return '/';
  }

  return `/${relative.split(path.sep).join('/')}`;
};

export const listFiles = async (req: Request, res: Response): Promise<void> => {
  const dirPath = String(req.query.path ?? '');
  const safePath = resolveSafePath(dirPath);

  if (!safePath) {
    res.status(403).json({ error: 'Path is outside allowed roots' });
    return;
  }

  try {
    const files = await readdir(safePath);
    const fileInfos = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(safePath, file);
        const fileStat = await stat(filePath);
        return {
          name: file,
          type: fileStat.isDirectory() ? 'directory' : 'file',
          size: fileStat.size,
          creationDate: fileStat.birthtime,
          lastModifiedDate: fileStat.mtime,
          fullPath: toClientPath(filePath),
        };
      }),
    );
    res.json(fileInfos);
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? (error as { code?: string }).code
        : undefined;
    if (code === 'ENOENT' || code === 'ENOTDIR') {
      res.status(404).json({ error: 'Directory not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to read directory' });
  }
};

export const getFileDetails = async (req: Request, res: Response): Promise<void> => {
  const filePath = String(req.query.path ?? '');
  const safePath = resolveSafePath(filePath);

  if (!safePath) {
    res.status(403).json({ error: 'Path is outside allowed roots' });
    return;
  }

  try {
    const fileStat = await stat(safePath);
    const fileDetails = {
      name: path.basename(safePath),
      type: fileStat.isDirectory() ? 'directory' : 'file',
      size: fileStat.size,
      creationDate: fileStat.birthtime,
      lastModifiedDate: fileStat.mtime,
      fullPath: toClientPath(safePath),
    };
    res.json(fileDetails);
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? (error as { code?: string }).code
        : undefined;
    if (code === 'ENOENT') {
      res.status(404).json({ error: 'File or directory not found' });
      return;
    }
    res.status(500).json({ error: 'Failed to read file details' });
  }
};
