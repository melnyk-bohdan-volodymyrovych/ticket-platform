import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';

export function IsExclusivelyDefined(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'IsExclusivelyDefined',
      validator: {
        validate: (value, args): boolean =>
          !!value && Object.keys(args.object).join('') === args.property,
        defaultMessage: buildMessage(
          (eachPrefix, args) =>
            `Each of ${Object.keys(args.object).join(', ')} properties can be defined exclusively only!`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
