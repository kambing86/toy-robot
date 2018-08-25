import {expect} from 'chai';
import {Table} from './Table';

describe('Table', () => {
  describe('constructor', () => {
    it('should assign correct x and y to table', () => {
      const totalX = 5;
      const totalY = 10;
      const table = new Table(totalX, totalY);

      expect(table.x).to.equal(totalX);
      expect(table.y).to.equal(totalY);
    });

    it('should throw error if totalX or totalY less than 1', () => {
      expect(() => {
        const table = new Table(0, 1);
      }).to.throw();

      expect(() => {
        const table = new Table(1, 0);
      }).to.throw();
    });
  });
});
