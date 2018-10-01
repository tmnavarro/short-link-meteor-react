import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

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

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your Link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      visible: true,
      userId: this.userId,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  'links.remove'(_id) {
    if (!this.userId) {
      return throw Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        label: 'Id',
      }
    }).validate({ _id });

    Links.remove(_id);

  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      return throw Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
        label: 'Id Link'
      },
      visible: {
        type: Boolean,
        label: 'Visible'
      }
    }).validate({ _id, visible });

    Links.update(_id, {$set: {visible: visible }});
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
        label: 'Id Link'
      }
    }).validate({ _id });
    console.log('pass');
    Links.update(_id, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });

  }
});
