import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';

const app = express();
const port = 3001; //UI is on port 3000

app.use(cors());
app.use(express.json());
app.use('/api', fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
