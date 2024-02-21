
const getHabits = async (req, res) => {
    res.json({msg: 'getHabits'});
}

const createHabit = async (req, res) => {
    res.json({msg: 'createHabit'});
}

module.exports = {getHabits, createHabit}