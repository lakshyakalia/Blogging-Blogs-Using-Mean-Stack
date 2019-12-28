const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

const { blogPosts,comments } = require('../models')

const posts = {
    createNewPost: async(req,res) =>{
        const blogPostObject = new blogPosts({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            postImage: typeof req.file === "undefined" || !req.file ? null : req.file.filename,
            postAuthor: req.user.username
        })
        await blogPostObject.save()
        res.status(200).json({ msg:"New post created",status:200 })
    },
        
    getAllPosts : async(req,res)=>{
        const allBlogs = await blogPosts.find()
        res.status(200).json({blogs: allBlogs, status:200})
    },

    getPostImage : async(req,res)=>{
        let image = {
            filename: req.params.id
        }

        let gfs = Grid(mongoose.connection.db,mongoose.mongo)
        gfs.collection('photos')

        gfs.files.findOne(image,(err,file)=>{
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        })
    },

    getParticularPost : async(req,res)=>{
        let postID = req.params.id

        let postData = await blogPosts.findById(postID)
        let commentsdata = await comments.find({postId: postID})

        res.status(200).json({post: postData,commentLength: commentsdata.length,status: 200}) 
    },

    getParticularPostComments : async(req,res)=>{
        let commentData = await comments.find({postId: req.query.postId})
        res.status(200).json({status : 200, comments: commentData})
    },

    saveNewPostComment : async(req,res)=>{
        let arr = []
        req.body.createdBy = req.user.username
        let commentObject = new comments(req.body)
        await commentObject.save(async (err,comment)=>{
            if(err){
                let error = Object.values(err.errors)[0].message
                res.status(200).json({status:400, msg: error})
            }
            else{
                arr.push(comment)
                let commentData = await comments.find({postId: req.body.postId})
                res.status(200).json({status:200, msg:'msg saved',data: arr,length: commentData.length})
            }
        })
    }
}

module.exports = posts