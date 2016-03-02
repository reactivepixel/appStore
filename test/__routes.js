// const request = require('supertest');
//
// //  Manually configure Test Routes, they will be mapped to individual tests
// // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// const known_routes = [
//   {title: 'Hello World', method: 'get', route: '/api/v1', status_code: 200, res: {msg:'Hello World', healthy: true}},
//   {title: 'Adding a Rubric', method: 'put', route: '/api/v1/rubric', status_code: 200, res: {healthy: true, ts: 123}}
// ];
//
// describe('Loading Express', function() {
//   var server;
//
//   // Before / After each test create / destroy the express server to fully simulate unique requests.
//   // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//   beforeEach(function() {
//     server = require('../src/server.js');
//   });
//   afterEach(function() {
//     server.close();
//   });
//
//   for(var route_index in known_routes){
//     var routeData = known_routes[route_index];
//     it('[' + routeData.status_code + '] ' + routeData.route + ' ' + routeData.title , function testHealth(done){
//       var superTestRequest = request(server)
//         switch (routeData.method) {
//           case 'get':
//             superTestRequest = superTestRequest.get(routeData.route);
//             break;
//           case 'put':
//             superTestRequest = superTestRequest.put(routeData.route);
//             break;
//           case 'post':
//             superTestRequest = superTestRequest.post(routeData.route);
//             break;
//           case 'delete':
//             superTestRequest = superTestRequest.del(routeData.route);
//             break;
//           case 'update':
//             superTestRequest = superTestRequest.update(routeData.route);
//             break;
//           default:
//           superTestRequest = superTestRequest.get(routeData.route);
//         }
//
//         superTestRequest.set('Accept', 'application/json')
//         .send(routeData.res)
//         .expect('Content-Type', /json/)
//         .expect(routeData.status_code, routeData.res, done);
//     });
//   }
//
//   // Force a bad route
//   // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//   it('404 everything bad routes', function testHealth(done){
//     request(server)
//       .get('/not/a/real/route')
//       .expect(404, done);
//   });
// });
