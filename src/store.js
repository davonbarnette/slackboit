/*
 * This file is meant for global variables so that the Messenger class can access fields outside of its own knowledge.
 * If you want to set something that future messages listen to, set it here and listen to it in your function. Take a
 * look at the omaeWaMouShindeiru function in messenger.js for an example.
 */

const Store = {
    disabledUntil: 0,
    usersById:null,
};

/*
* full user object
* { id: 'string',
       team_id: 'string',
       name: 'string',
       deleted: false,
       color: '9f69e7',
       real_name: 'string',
       tz: 'America/New_York',
       tz_label: 'Eastern Daylight Time',
       tz_offset: -14400,
       profile: [Object],
       is_admin: true,
       is_owner: true,
       is_primary_owner: true,
       is_restricted: false,
       is_ultra_restricted: false,
       is_bot: false,
       is_app_user: false,
       updated: 1541611365,
       presence: 'away' },

       --- profile object ---

       { title: '',
  phone: '',
  skype: '',
  real_name: 'string',
  real_name_normalized: 'string',
  display_name: '',
  display_name_normalized: '',
  fields: [],
  status_text: '',
  status_emoji: '',
  status_expiration: 0,
  avatar_hash: '22dd65884527',
  image_original: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_original.jpg',
  email: 'string',
  first_name: 'string',
  last_name: 'string',
  image_24: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_24.jpg',
  image_32: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_32.jpg',
  image_48: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_48.jpg',
  image_72: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_72.jpg',
  image_192: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_192.jpg',
  image_512: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_512.jpg',
  image_1024: 'https://avatars.slack-edge.com/2019-01-21/528963495858_22dd65884527af58771b_1024.jpg',
  status_text_canonical: '',
  team: 'string',
  is_custom_image: true }
* */

module.exports = Store;