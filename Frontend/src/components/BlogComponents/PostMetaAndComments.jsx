import "./PostMetaAndComments.css";
import { CgFacebook } from "react-icons/cg";
import { FaPinterestP } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
const comments = [
  {
    name: "John Smith",
    time: "November 26, 2016 at 3:03 pm",
    text: "Tortor Parturient Amet Lorem",
  },
  {
    name: "John Smith",
    time: "November 26, 2016 at 3:04 pm",
    text:
      "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus.",
  },
  {
    name: "John Smith",
    time: "November 26, 2016 at 3:05 pm",
    text: "Ridiculus Quam Adipiscing",
  },
  {
    name: "John Smith",
    time: "February 7, 2017 at 6:22 pm",
    text: "Nullam quis risus eget urna mollis ornare vel eu leo.",
  },
  {
    name: "John Smith",
    time: "March 1, 2017 at 10:11 am",
    text: "Aenean lacinia bibendum nulla sed consectetur.",
  },
];

const PostMetaAndComments = () => {
  return (
    <section className="post-extra">

      {/* SHARE */}
      <div className="post-share">
        <span className="share-count"><b>0</b> SHARES</span>
        <span className="share-icons">
          <a href="#"><CgFacebook /></a>
          <a href="#"><FaPinterestP /></a>
          <a href="#"><BsTwitterX /></a>
        </span>
      </div>

      {/* AUTHOR */}
      <div className="post-author">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="author"
        />
        <span className="about">About the author</span>
        <h4>John Smith</h4>
        <p>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        </p>
      </div>

      {/* PREV NEXT */}
      <div className="post-nav">
        <span>← PREV</span>
        <span>NEXT →</span>
      </div>

      {/* COMMENTS */}
      <h4 className="response-title">5 RESPONSES</h4>

      <div className="comments-list">
        {comments.map((c, i) => (
          <div className="comment-item" key={i}>
            <img
              src="https://i.pravatar.cc/60?img=12"
              alt="user"
            />

            <div className="comment-body">
              <div className="comment-head">
                <strong>{c.name}</strong>
                <span>{c.time}</span>
                <a href="#">REPLY</a>
              </div>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostMetaAndComments;
