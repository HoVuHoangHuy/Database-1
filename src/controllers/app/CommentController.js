const commentService = require("../../services/app/CommentService");

// lấy tất cả bình luận của một khoảnh khắc
const getMomentsCommentsController = async (id) => {
  try {
    return await commentService.getMomentsComment(id);
  } catch (error) {
    return null;
  }
};

// viết bình luận
const postComment = async (userid, momentid, content, createdat) => {
  try {
    return await commentService.postComment(
      userid,
      momentid,
      content,
      createdat
    );
  } catch (error) {
    return null;
  }
};
//xoa binh luan 
const deleteComment =async(id)=>{
  try {
    return await commentService.deleteComment(id);
  } catch (error) {
    return null;
  }
}
//sua binh luan 
const updateComment =async(id,content)=>{
  try {
    return await commentService.updateComment(id,content);
  } catch (error) {
    return null;
  }
}

module.exports = { getMomentsCommentsController, postComment,deleteComment,updateComment };
