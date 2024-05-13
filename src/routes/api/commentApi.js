const express = require("express");
const router = express.Router();
const commentsController = require("../../controllers/app/CommentController");

//  lấy tất cả bình luận của khoảnh khắc
// http://localhost:3000/api/comments/getComments/
router.get("/getComments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await commentsController.getMomentsCommentsController(id);
    if (comments) {
      return res.status(200).json({ result: true, comments: comments });
    }
    return res.status(500).json({ result: false, comments: null });
  } catch (error) {
    return res.status(400).json({ result: false, error: error });
  }
});

// viết bình luận
// http://localhost:3000/api/comments/postComments
router.post("/postComments", async (req, res) => {
  try {
    const { userid, momentid, content, createdat } = req.body;
    const comments = await commentsController.postComment(
      userid,
      momentid,
      content,
      createdat
    );
    if (comments) {
      return res.status(200).json({ result: true, comments: comments });
    }
    return res.status(500).json({ result: false, comments: null });
  } catch (error) {
    return res.status(400).json({ result: false, error: error });
  }
});
// xóa một binh luan
// http://localhost:3000/api/comments/deleteComment/:idComment
router.get("/deleteComment/:idComment", async (req, res, next) => {
  try {
    const { idComment } = req.params;
    console.log(idComment);
    const response = await commentsController.deleteComment(idComment);
    if (response) {
      return res.status(200).json({ result: true });
    }
    return res.status(500).json({ result: false });
  } catch (error) {
    return res.status(400).json({ result: false, error: error.message });
  }
});
// cập nhật binh luan
// http://localhost:3000/api/comments/updateComment
router.post("/updateComment", async (req, res, next) => {
  try {
    const { id, content } = req.body;
    const comment = await commentsController.updateComment(
      id,
      content
    );
    if (comment) {
      return res.status(200).json({ result: true, comment: comment });
    }
    return res.status(500).json({ result: false, comment: null });
  } catch (error) {
    return res.status(500).json({ result: false, comment: null });
  }
});


module.exports = router;
