const getSample = async (id) => {
  return new Promise((resolve) => {
    global.sqlPool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({
          code: 5000,
          data: null,
        });
      } else {
        let sqlGetSample = "SELECT * FROM sample WHERE id = " + id + ";";
        connection.query(sqlGetSample, function (error, resultsGetSample, fields) {
          connection.release();
          if (!error) {
            if (resultsGetSample.length > 0) {
              let sample = resultsGetSample[0];
              resolve(sample);
            } else {
              resolve({
                code: 4004,
                data: null,
              });
            }
          } else {
            console.log(error);
            resolve({
              code: 5000,
              data: null,
            });
          }
        });
      }
    });
  });
}

const getSamples = async (page, size) => {
  return new Promise((resolve) => {
    global.sqlPool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({
          code: 5000,
          data: null,
        });
      } else {
        let sqlGetPageInfo = "SELECT COUNT(DISTINCT(sample.id)) AS count FROM company;";
        connection.query(sqlGetPageInfo, function (error, resultPageInfo, fields) {
          if (!error) {
            let data = {
              count: 0,
              samples: []
            }
            if (resultPageInfo[0].count > 0) {
              data.count = resultPageInfo[0].count;
              let sqlGetSamples = "SELECT * FROM sample LIMIT " + size + " OFFSET " + (page - 1) * size + ";";
              connection.query(sqlGetSamples, function (error, resultsGetSamples, fields) {
                connection.release();
                if (!error) {
                  if (resultsGetSamples.length > 0) {
                    data.samples = resultsGetSamples
                    resolve({
                      code: 2000,
                      data: data,
                    });
                  } else {
                    resolve({
                      code: 4004,
                      data: data,
                    });
                  }
                } else {
                  console.log(error);
                  resolve({
                    code: 5000,
                    data: null,
                  });
                }
              });
            } else {
              connection.release();
              resolve({
                code: 4004,
                data: data,
              });
            }
          } else {
            connection.release();
            console.log(error);
            resolve({
              code: 5000,
              data: null,
            });
          }
        });
      }
    });
  });
}

const createSample = async (stringProp, intProp, bigIntProp, datetimeProp) => {
  return new Promise((resolve) => {
    global.sqlPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        console.log(err);
        resolve({
          code: 5000,
          data: null,
        });
      } else {
        let sqlCreateSample = "INSERT INTO `sample`(stringProp, intProp, bigIntProp, datetimeProp) VALUES('" + stringProp + "', " + intProp + ", " + bigIntProp + ", '" + datetimeProp + "');";
        connection.query(sqlCreateSample, function (error, resultsCreateSample, fields) {
          connection.release();
          if (!error) {
            if (resultsCreateSample.affectedRows > 0) {
              let sample = {
                id: resultsCreateSample.insertId,
                stringProp: stringProp,
                intProp: intProp,
                bigIntProp: bigIntProp,
                datetimeProp: datetimeProp,
              };
              resolve({
                code: 2000,
                data: sample,
              });
            } else {
              resolve({
                code: 3000,
                data: null,
              });
            }
          } else {
            console.log(error);
            resolve({
              code: 5000,
              data: null,
            });
          }
        });
      }
    });
  });
}

module.exports = { getSample, getSamples, createSample };
