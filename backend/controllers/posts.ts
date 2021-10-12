import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'

interface Post {
    userId: Number
    id: Number
    title: String
    body: String
}

// @desc    Fetch all Posts
// @route   GET /api/posts
// @access  Public 

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    let posts: [Post] = result.data
    return res.status(200).json({
        data: posts
    })
}

// @desc    Fetch a single post
// @route   GET /api/posts/:id
// @access  Public 

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id
    // get the post from remote server
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data
    return res.status(200).json({
        data: post
    });
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public 

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    // get the data from req.body
    let title: string = req.body.title ?? ''
    let body: string = req.body.body ?? ''
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        data: response.data
    });
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Public

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let id: string = req.params.id
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully',
        data: response
    });
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Public

const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title
    let body: string = req.body.body
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        data: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost }