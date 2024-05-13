const commentModel = require("../../models/commentModel");
const userModel = require("../../models/UserModel");

// lấy comment của một bài viết
const getMomentsComment = async (id) => {
  try {
    const comments = await commentModel.find({ momentid: id });
    const listComments = [];
    if (comments) {
      for (const comment of comments) {
        const user = await userModel.findById(comment.userid);
        const data = {
          _id: comment._id,
          userid: user._id,
          username: user.username,
          avatar: user.avatar,
          momentid: comment.momentid,
          content: comment.content,
          createdat: comment.createdat,
        };
        listComments.push(data);
      }
      const sortComments = listComments.sort(
        (a, b) => b.createdat - a.createdat
      );
      return sortComments;
    }
    return null;
  } catch (error) {
    console.log("failed to get comments: " + error.message);
  }
};

// viết commnent
const postComment = async (userid, momentid, content, createdat) => {
  try {
    const comment = {
      userid: userid,
      momentid: momentid,
      content: content,
      createdat: createdat,
    };
    const newComment = new commentModel(comment);
    const res = await newComment.save();
    if (res) {
      return res;
    }
    return null;
  } catch (error) {
    console.log('failed to post comment: "' + error.message);
  }
};
//xoa comment
const deleteComment = async (id) => {
  console.log("adadadad");
  try {
    const res = await commentModel.deleteOne({ _id: id });
  
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Error deleting moment: " + error.message);
  }

}; 
// cập nhật binh luan
const updateComment = async (id, content) => {
  try {
    const comment = await commentModel.findById(id);
    if (comment) {
      comment.content = content ? content : comment.content;    
      await comment.save();
      return comment;
    }
    return null;
  } catch (error) {
    console.log("failed to update comment: ", error.message);
  }
};

module.exports = { getMomentsComment, postComment,deleteComment,updateComment };
