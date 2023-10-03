const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server'); // Zaimportuj swoją aplikację Express

describe('Testy API koncertów', () => {
  it('/concerts/:id powinno zwrócić koncert po ID', async () => {
    const res = await request(app).get('/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/concerts/performer/:performer powinno zwrócić koncerty danego artysty', async () => {
    const res = await request(app).get('/api/concerts/performer/John Doe');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('/concerts/genre/:genre powinno zwrócić koncerty z wybranego gatunku muzycznego', async () => {
    const res = await request(app).get('/api/concerts/genre/Rock');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('/concerts/price/:price_min/:price_max powinno zwrócić koncerty w określonym przedziale cenowym', async () => {
    const res = await request(app).get('/api/concerts/price/20/50');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('/concerts/price/day/:day powinno zwrócić koncerty w wybranym dniu', async () => {
    const res = await request(app).get('/api/concerts/day/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
