import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchBlogsAPI,
  createBlogAPI,
  updateBlogAPI,
  deleteBlogAPI,
} from './blogAPI';

/*  ASYNC ACTIONS  */

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    const data = await fetchBlogsAPI();
    return data.blogs;
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData) => {
    const data = await createBlogAPI(blogData);
    return data.blog;
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, data }) => {
    await updateBlogAPI({ id, data });
    return { id, data };
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id) => {
    await deleteBlogAPI(id);
    return id;
  }
);

/* SLICE  */

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    list: [],
    loading: false,
    selectedBlog: null,
    showCreateModal: false,
    showEditModal: false,
    showViewModal: false,
  },
  reducers: {
    openCreateModal: (state) => {
      state.showCreateModal = true;
    },
    closeCreateModal: (state) => {
      state.showCreateModal = false;
    },
    openEditModal: (state, action) => {
      state.selectedBlog = action.payload;
      state.showEditModal = true;
    },
    openViewModal: (state, action) => {
      state.selectedBlog = action.payload;
      state.showViewModal = true;
    },
    closeAllModals: (state) => {
      state.showCreateModal = false;
      state.showEditModal = false;
      state.showViewModal = false;
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (b) => b._id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (b) => b._id !== action.payload
        );
      });
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditModal,
  openViewModal,
  closeAllModals,
} = blogSlice.actions;

export default blogSlice.reducer;
