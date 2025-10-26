import api from "@/api";

export async function getBlogs(searchQuery, categoryFilter) {
  try {
    let url = "blog_list";
    const params = new URLSearchParams();

    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (categoryFilter) {
      params.append("category", categoryFilter);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBlog(slug) {
  try {
    const response = await api.get(`blogs/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post("register_user/", data);
    return response.data;
  } catch (err) {
    console.log(err);
    if (err.status == 400) {
      throw new Error("Username already exists");
    }
    throw new Error(err);
  }
}

export async function signin(data) {
  try {
    const response = await api.post("token/", data);
    return response.data;
  } catch (err) {
    if (err.status === 401) {
      throw new Error("Invalid Credentials");
    }

    throw new Error(err);
  }
}

export async function getUsername() {
  try {
    const response = await api.get("get_username");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("create_blog/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBlog(data, id) {
  try {
    const response = await api.put(`update_blog/${id}/`, data);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to update blog");
    }

    throw new Error(err.message);
  }
}

export async function deleteBlog(id) {
  try {
    const response = await api.post(`delete_blog/${id}/`);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to delete blog");
    }

    throw new Error(err.message);
  }
}

export async function getUserInfo(username) {
  try {
    const response = await api.get(`get_userinfo/${username}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateProfile(data) {
  try {
    const response = await api.put(`update_user/`, data);
    return response.data;
  } catch (err) {
    console.log(err)
    if (err.response) {
      throw new Error(
        err?.response?.data.username[0] || "Failed to update profile"
      );
    }

    throw new Error(err.message);
  }
}

export async function generateAIDescription(title) {
  try {
    const response = await api.post("generate_description/", { title });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(
        err.response?.data?.error || "Failed to generate description"
      );
    }
    throw new Error(err.message);
  }
}