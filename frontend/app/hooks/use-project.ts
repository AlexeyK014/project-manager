// import type { CreateProjectFormData } from "@/components/project/create-project";
// import { fetchData, postData } from "@/lib/fetch-util";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export const UseCreateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: {
//       projectData: CreateProjectFormData;
//       workspaceId: string;
//     }) =>
//       postData(
//         `/projects/${data.workspaceId}/create-project`,
//         data.projectData
//       ),
//     onSuccess: (data: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["workspace", data.workspace],
//       });
//     },
//   });
// };

import type { CreateProjectFormData } from "@/components/project/create-project";
import { fetchData, postData } from "@/lib/fetch-util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export const UseCreateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: {
//       projectData: CreateProjectFormData;
//       workspaceId: string;
//     }) =>
//       postData(
//         `/projects/${data.workspaceId}/create-project`,
//         data.projectData
//       ),
//     onSuccess: (data: any) => {
//       queryClient.invalidateQueries({
//         queryKey: ["workspace", data.workspace],
//       });
//     },
//   });
// };

export const UseCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectData: CreateProjectFormData;
      workspaceId: string;
    }) => {
      const url = `/projects/${data.workspaceId}/create-project`;
      console.log("Making POST request to:", url);
      console.log("Data:", data.projectData);
      
      return postData(url, data.projectData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.workspace],
      });
    },
  });
};

export const UseProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchData(`/projects/${projectId}/tasks`),
  });
};