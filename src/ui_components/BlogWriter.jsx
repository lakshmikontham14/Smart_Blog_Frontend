import { BASE_URL } from "@/api"
import pic from "../images/pic.jpg"
import { FormatDate } from "@/services/formatDate"
import { Link } from "react-router-dom"

const BlogWriter = ({blog}) => {
  return (
    <Link to={`/profile/${blog.author.username}`}>
    <div className="flex items-center gap-4">

      
      <span className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 shadow-sm">
          <img
            src={`${BASE_URL}${blog.author.profile_picture}`}
            alt={blog.author.first_name + " " + blog.author.last_name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-sm font-medium text-foreground dark:text-primary-foreground">
          {blog.author.first_name} {blog.author.last_name}
        </small>
      </span>

      <small className="text-sm text-muted-foreground ml-4">
        {FormatDate(blog.published_date)}
      </small>


    </div>
    </Link>
  )
}

export default BlogWriter
