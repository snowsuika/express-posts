const Post = require('../models/postsModel');
const handleError = require('../service/handleError');
const handleSuccess = require('../service/handlesSuccess');

const posts = {
    getAllPost: async (req, res) => {
        let query = {
            keyword: req.query.keyword || '',
            sort: req.query.sort || 'desc', //desc 遞減 (default); asc 遞增
        };

        const allPosts = await Post.find({
            content: { $regex: query.keyword },
        }).sort({
            createdAt: query.sort === 'desc' ? -1 : 1,
        });

        handleSuccess(req, res, allPosts);
    },

    getOnePost: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if (post) {
                handleSuccess(req, res, post);
            } else {
                throw new Error('資料取得失敗，請確認 id 是否正確');
            }
        } catch (error) {
            handleError(req, res, error);
        }
    },

    createPost: async (req, res) => {
        try {
            const data = req.body;
            const _checkData = () => {
                if (!data.tags || data.tags.length == 0 || data.tags == '') throw new Error('貼文 tags 為必填');
                return true;
            };

            if (_checkData()) {
                const newPost = await Post.create({
                    name: data.name,
                    tags: data.tags,
                    type: data.type,
                    image: data.image,
                    content: data.content,
                });

                handleSuccess(req, res, newPost);
            } else {
                throw new Error('貼文新增失敗，請確認欄位是否填寫');
            }
        } catch (error) {
            handleError(req, res, error);
        }
    },

    updatePosts: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;

            const updatePost = await Post.findByIdAndUpdate(
                id,
                {
                    name: data.name,
                    tags: data.tags,
                    type: data.type,
                    image: data.image,
                    content: data.content,
                },
                {
                    new: true,
                }
            );

            if (updatePost) {
                handleSuccess(req, res, updatePost);
            } else {
                throw new Error('更新失敗，請確認 id 是否正確');
            }
        } catch (error) {
            handleError(req, res, error);
        }
    },

    deleteOnePost: async (req, res) => {
        try {
            const id = req.params.id;
            const isSuccessDelete = await Post.findByIdAndDelete(id);
            if (isSuccessDelete) {
                const allPosts = await Post.find();
                handleSuccess(req, res, allPosts);
            } else {
                throw new Error('刪除失敗，請確認 id 是否正確。');
            }
        } catch (error) {
            handleError(req, res, error);
        }
    },

    deleteOnePost: async (req, res) => {
        try {
            const id = req.params.id;
            const isSuccessDelete = await Post.findByIdAndDelete(id);
            if (isSuccessDelete) {
                const allPosts = await Post.find();
                handleSuccess(req, res, allPosts);
            } else {
                throw new Error('刪除失敗，請確認 id 是否正確。');
            }
        } catch (error) {
            handleError(req, res, error);
        }
    },

    deleteAllPost: async (req, res) => {
        try {
            await Post.deleteMany({});
            const allPosts = await Post.find();
            handleSuccess(req, res, allPosts);
        } catch (error) {
            handleError(req, res, error);
        }
    },
};

module.exports = posts;
