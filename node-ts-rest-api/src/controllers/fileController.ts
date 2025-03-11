import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export const listFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dirPath = req.query.path as string;

  if (!dirPath) {
    res.status(400).json({ error: 'Invalid path' });
    return;
  }

  try {
    const files = await readdir(dirPath);
    const fileInfos = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const fileStat = await stat(filePath);
        return {
          name: file,
          type: fileStat.isDirectory() ? 'directory' : 'file',
          size: fileStat.size,
          creationDate: fileStat.birthtime,
          lastModifiedDate: fileStat.mtime,
        };
      }),
    );
    res.json(fileInfos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory' });
  }
};

export const getFileDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filePath = req.query.path as string;

  if (!filePath) {
    res.status(400).json({ error: 'Invalid path' });
    return;
  }

  try {
    const fileStat = await stat(filePath);
    const fileDetails = {
      name: path.basename(filePath),
      type: fileStat.isDirectory() ? 'directory' : 'file',
      size: fileStat.size,
      creationDate: fileStat.birthtime,
      lastModifiedDate: fileStat.mtime,
    };
    res.json(fileDetails);
  } catch (error) {
    res.status(404).json({ error: 'File or directory not found' });
  }
};
