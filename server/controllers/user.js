export const signup = async (req, res) => {
  try {
    return res.status(200).send({ message: "SYSTEM WORKING sugnup" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signin = async (req, res) => {
  try {
    return res.status(200).send({ message: "SYSTEM WORKING signin" });
  } catch (error) {
    res.status(500).send(error);
  }
};
