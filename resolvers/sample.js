const { getSample, getSamples, createSample } = require('./../modules/sample');

const emptySample = {
  id: 0,
  stringProp: null,
  intProp: 0,
  bigIntProp: 0,
  datetimeProp: null
}

const emptySampleList = {
  edges: [],
  totalPage: 0,
  currentPage: 0,
  pageSize: 0
}

const sampleResolver = {
  Query: {
    sample: async (_, { id }) => {
      let data = await getSample(id);
      if (data.data) {
        return {
          code: data.code,
          data: data.data
        };
      } else {
        return {
          code: data.code,
          data: emptySample
        }
      }
    },
    samples: async (_, { page, size }) => {
      let data = await getSamples(page, size);
      if (data.data) {
        return {
          code: data.code,
          data: {
            edges: data.data.samples,
            totalPage: Math.ceil(data.data.count / size),
            currentPage: page,
            pageSize: size
          }
        };
      } else {
        return {
          code: data.code,
          data: emptySampleList
        }
      }
    },
  },
  Mutation: {
    createSample: async (_, { stringProp, intProp, bigIntProp, datetimeProp }) => {
      let data = await createSample(stringProp, intProp, bigIntProp, datetimeProp);
      if (data.data) {
        return {
          code: data.code,
          data: data.data
        };
      } else {
        return {
          code: data.code,
          data: emptySample
        }
      }
    }
  },
};

module.exports = sampleResolver;
