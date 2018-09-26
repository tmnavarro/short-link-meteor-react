import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      return throw Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Seu link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({ url });
    } catch(e) {
      //console.log(e);
    }


    Links.insert({
      url,
      userId: this.userId
    });
  }
});
