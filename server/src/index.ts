import { Hono } from 'hono'
import {decode, sign,verify} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string  // you need to declare this otherwise it will throw an error env not found
    JWT_SECRET: string
  }
}>()

// env cant declared globally because it is not available globally as in doc of hono you need context (c)
app.post('/api/v1/signup', async (c) => {
    const prisma = new PrismaClient({
      // ts-ingnor you can ignore this error if Binding is not done
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

    const body = await c.req.json(); 
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password
      }
    })
    const token = sign({id:user.id},c.env.JWT_SECRET)
    return c.json({token});   
})

app.post('/api/v1/signin', (c) => {
  return c.text('signin route')
})

app.post('/api/v1/blog', (c) => {
  return c.text('All Blog details!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Single Blog Details!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('  Hono!')
})


export default app
