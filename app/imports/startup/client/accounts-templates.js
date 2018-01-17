import { AccountsTemplates } from 'meteor/useraccounts:core';
// import { FlowRouter } from 'meteor/kadira:flow-router';

AccountsTemplates.configure({
  defaultLayoutType: 'blaze-to-react',
  defaultTemplate: 'fullPageAtForm',
  defaultLayout: 'globe',
  defaultContentRegion: 'main',
  onLogoutHook() {
    // FlowRouter.go('/landing');
  },
  texts: {
    title: {
      changePwd: 'Password Title',
      enrollAccount: 'Enroll Title',
      forgotPwd: '',
      resetPwd: 'Reset Pwd Title',
      signIn: '',
      signUp: '',
      verifyEmail: '',
    },

    // 'If you already have an account [SignIn]'
    signInLink_pre: '',
    signInLink_link: '',
    signInLink_suff: '',

    // 'Don't have an account? [Register]'
    signUpLink_pre: '',
    signUpLink_link: '',
    signUpLink_suff: '',
  },
});

AccountsTemplates.addFields(
  [
    {
      _id: 'fullName',
      type: 'text',
      displayName: 'Full Name',
      required: true,
      minLength: 1,
    },
    {
      _id: 'location',
      type: 'text',
      displayName: 'Location',
      required: true,
      minLength: 1,
    },
  ]
);
