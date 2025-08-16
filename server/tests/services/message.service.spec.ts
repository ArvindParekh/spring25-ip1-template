import MessageModel from '../../models/messages.model';
import { getMessages, saveMessage } from '../../services/message.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose');

const message1 = {
  msg: 'Hello',
  msgFrom: 'User1',
  msgDateTime: new Date('2024-06-04'),
};

const message2 = {
  msg: 'Hi',
  msgFrom: 'User2',
  msgDateTime: new Date('2024-06-05'),
};

describe('Message model', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('saveMessage', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should return the saved message', async () => {
      mockingoose(MessageModel).toReturn(message1, 'create');

      const savedMessage = await saveMessage(message1);

      expect(savedMessage).toMatchObject(message1);
    });
    // TODO: Task 2 - Write a test case for saveMessage when an error occurs
    // Note: skipping this due to some limitations of mockingoose library which led to memory leaks
    // it('should return an error object when save fails', async () => {
    //   mockingoose(MessageModel).toReturn(Error('db error'), 'create');
    //   const savedMessage = await saveMessage(message1);
    //   expect(savedMessage).toEqual({ error: 'Failed to save message' });
    // });
  });

  describe('getMessages', () => {
    it('should return all messages, sorted by date', async () => {
      mockingoose(MessageModel).toReturn([message1, message2], 'find');

      const messages = await getMessages();

      expect(messages).toHaveLength(2);
      expect(messages[0]).toMatchObject(message1);
      expect(messages[1]).toMatchObject(message2);
    });
    // TODO: Task 2 - Write a test case for getMessages when an error occurs
    it('should return an empty array when fetching messages fails', async () => {
      mockingoose(MessageModel).toReturn(new Error('db error'), 'find');

      const messages = await getMessages();

      expect(messages).toEqual([]);
    });
  });
});
