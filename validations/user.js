// const Joi = require('joi');
//
// exports.userValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string()
//       .min(2)
//       .max(30)
//       .required()
//       .default('Жак-Ив Кусто'),
//     about: Joi.string()
//       .min(2)
//       .max(30)
//       .required()
//       .default('Исследователь'),
//     avatar: Joi.string()
//       .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
//     email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
//     password: Joi.string()
//       .pattern(/('^[a-zA-Z0-9]{3,30}$')/),
//   });
//   return schema.validate(data);
// };
