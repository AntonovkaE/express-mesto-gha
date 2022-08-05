const {
  celebrate,
  Joi,
} = require('celebrate');

const validationId = () => {
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string()
          .alphanum()
          .length(24),
      }),
  });
};

const updateUserValidation = () => {
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .min(2)
          .max(30)
          .required(),
        about: Joi.string()
          .min(2)
          .max(30)
          .required(),
      }),
  });
};

const updateAvatarValidation = () => {
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string()
          .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
          .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
      }),
  });
};

const createCardValidation = () => {
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .min(2)
          .max(30),
        link: Joi.string()
          .required()
          .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
      }),
  });
};

const loginValidation = () => {
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(8),
      }),
  });
};

const createUserValidation = () => {
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(8),
        name: Joi.string()
          .min(2)
          .max(30)
          .default('Жак-Ив Кусто'),
        avatar: Joi.string()
          .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
          .pattern(/^(ftp|http|https):\/\/[^ "]+$/),
        about: Joi.string()
          .min(2)
          .max(30)
          .default('Исследователь'),
      })
      .unknown(true),
  });
};

module.exports = {
  loginValidation,
  validationId,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation,
  createUserValidation,
};
