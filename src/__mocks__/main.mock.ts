export const useRouter = jest.spyOn(require("next/router"), "useRouter");
const query = { page: 1 };
const router = { query, push: jest.fn() };
useRouter.mockReturnValue(router);
