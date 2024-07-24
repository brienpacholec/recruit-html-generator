const csv = require('csv-parser');
const fs = require('fs');
const results = [];

// Check if CLI argument for year is passed
if (process.argv.length < 3) {
  console.log('Usage: node index.js <year>');
  process.exit(1);
}

const path = `${process.argv[2]}/recruits.csv`;
fs.createReadStream(path)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Sort by Rating DESC and then by Name DESC as a tiebreaker
    results.sort((a, b) => {
      if (b.Rating !== a.Rating) {
        return b.Rating - a.Rating; // Sort by Rating DESC
      }
      return a.Name.localeCompare(b.Name); // Sort by Name DESC as a tiebreaker
    });

    console.log('=======\n');
    console.log(results);
    console.log('\n=======');
  });
