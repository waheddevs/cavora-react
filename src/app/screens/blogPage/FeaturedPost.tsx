import { useNavigate } from "react-router-dom"
import { featuredPosts } from "../../../js/Blog"

export default function FeaturedPost() {
  const navigate = useNavigate()
  return (
    <div className="sidebar-widget">
      <h3 className="widget-title">Featured Post</h3>
      <div className="feat-list">
        {featuredPosts.map((post) => (
          <div
            className="feat-item"
            key={post.id}
            onClick={() => navigate(`/blog-details?id=${post.id}`)}
          >
            <img src={post.img} alt={post.title} />
            <div className="feat-info">
              <h4>{post.title}</h4>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
