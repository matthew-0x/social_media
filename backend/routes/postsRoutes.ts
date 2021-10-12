import express from 'express'
import postController from '../controllers/posts'

const router = express.Router()

router.route('/').get(postController.getPosts).post(postController.addPost)

router
  .route('/:id')
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost)

export default router
