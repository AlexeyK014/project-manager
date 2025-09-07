import express from "express";

import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import {
    emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../libs/validate-schema.js";
import {
  loginUser,
  registerUser,
  resetPasswordRequest,
  // verifyEmail,
  verifyResetPasswordAndToken,
} from "../controllers/auth-controllers.js";

const router = express.Router();

router.post(
  "/register",
  // для подтверждения запроса
  validateRequest({
    body: registerSchema, // проверяет тело запроса на соответствие схеме валидации
  }),
  registerUser
);

router.post(
  "/login",
  // для подтверждения запроса
  validateRequest({
    body: loginSchema, // проверяет тело запроса на соответствие схеме валидации
  }),
  loginUser
);

// Для верификации емайл
// router.post(
//     "/verify-email",
//     // для подтверждения запроса
//     validateRequest({
//         body: verifyEmailSchema // проверяет тело запроса на соответствие схеме валидации
//     }),
//     verifyEmail // Основная логика: проверка токена, поиск в БД, подтверждение email и ответ
// );

// Для восстановления пароля
router.post(
  "/reset-password-request",
  validateRequest({
    body: emailSchema,
  }),
  resetPasswordRequest
);

// для перезаписи пароля
router.post(
  "/reset-password",
  validateRequest({
    body: resetPasswordSchema,
  }),
  verifyResetPasswordAndToken
);



export default router;
