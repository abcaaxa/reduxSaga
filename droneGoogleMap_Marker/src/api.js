export const fetchData = async () => {
  try {
    const response = await fetch("https://react-assessment-api.herokuapp.com/api/drone");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
