const data = require('./utils/_DATA.js');

describe('_saveQuestion', () => {
  it('will return the saved question if correctly formatted data is passed to the function', async() => {
    
    const question = {
      optionOneText: "Work more time",
      optionTwoText: "Work less time",
      author: "david",
    };
    const savedQuestion = await data._saveQuestion(question);
    expect(question.optionOneText).toEqual(savedQuestion.optionOne.text);
    expect(question.optionTwoText).toEqual(savedQuestion.optionTwo.text);
    expect(question.author).toEqual(savedQuestion.author);
  });

  it("will reject with an error message if incorrect data is passed in", async () => {
    const question = {
      optionOneText: "foo",
      optionTwoText: "bar",
    };

    await expect(data._saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});