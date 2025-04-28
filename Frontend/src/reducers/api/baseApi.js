// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials } from "../authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/v1",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

//     if (refreshResult?.data) {
//       api.dispatch(setCredentials({ ...refreshResult.data }));

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         refreshResult.error.data.message = "Your login has expired.";
//       }
//       return refreshResult;
//     }
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Course", "User", "Courses", "CourseProgress"],
//   // eslint-disable-next-line no-unused-vars
//   endpoints: (builder) => ({}),
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../authSlice";

// Use this flag to toggle real vs mock APIs (for development)
const USE_MOCK_API = false; // Set to true if backend is not running

// Real API setup
const realBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Mock fallback base query
const mockBaseQuery = async (args) => {
  console.warn("⚠️ MOCK API USED: Backend not connected");
  return {
    data: {
      mock: true,
      message: "This is a mocked response.",
      ...(typeof args === "string" && args.includes("user")
        ? {
            courseProgress: [
              {
                _id: "mocked-course-id-1",
                completedVideos: ["sub1", "sub2"],
                courseId: {
                  courseName: "Mocked React Course",
                  previewImage: "https://via.placeholder.com/300x150",
                  courseContent: [
                    {
                      subSection: [
                        { _id: "sub1" },
                        { _id: "sub2" },
                        { _id: "sub3" },
                      ],
                    },
                  ],
                },
              },
            ],
          }
        : {}),
    },
  };
};

// Wrapper that handles token refresh logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = USE_MOCK_API ? mockBaseQuery : realBaseQuery;
  let result;

  try {
    result = await baseQuery(args, api, extraOptions);
  } catch (err) {
    console.error("⚠️ Fetch failed:", err.message);
    return {
      error: {
        status: "FETCH_ERROR",
        data: { message: "Failed to connect to backend server." },
      },
    };
  }

  if (result?.error?.status === 403 && !USE_MOCK_API) {
    const refreshResult = await realBaseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await realBaseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

// API Slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "User", "Courses", "CourseProgress"],
  endpoints: (builder) => ({}), // Add endpoints in specific slices
});
