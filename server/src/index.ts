import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string  // you need to declare this otherwise it will throw an error env not found
		JWT_SECRET: string
	}
}>()
app.use(cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

export default app
