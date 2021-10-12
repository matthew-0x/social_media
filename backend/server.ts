import express , {Express} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import postRoutes from './routes/postsRoutes.js'
dotenv.config({ path: './.env' })

const app: Express = express()
const serverPORT = process.env.PORT || 5000
if(process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
      return res.status(200).json({});
  }
  next();
});

app.use('/api/posts', postRoutes)
app.get('/', (req, res) => {
  res.send('Server is up')
})
app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
      message: error.message
  });
});

app.listen(
  serverPORT, 
  () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${serverPORT}`)
)
