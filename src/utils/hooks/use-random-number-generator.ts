const useRandomNumberGenerator = (defaultValue?: number) => {
  const randomNumber = defaultValue;

  const generate = (number: number) => {
    const localNumber = number;
    const result = Math.floor(Math.random() * number);

    if (result === randomNumber) {
      generate(localNumber);
    }

    return result;
  };

  return { generate, randomNumber };
};

export default useRandomNumberGenerator;
