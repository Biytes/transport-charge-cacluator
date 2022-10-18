export default {
    register: 'Sign up',
    login: 'Log in',
    skip: 'Skip',
    email: 'Email',
    password: 'Password',
    cancel: 'Cancel',

    // 协议相关 公共
    agreement: {
        'read the agree agrement': '阅读并同意用户协议、隐私协议',
        userAgreement: '<User Agreement>',
        privacyAgreement: '<Privacy Agreement>'
    },

    // 登录页
    login_page: {
        create_new_account: 'Create new account',
        email_error_hint: 'E-mail format error',
        password_error_hint: 'Use 5 characters or more for your password',
        agreement_hint: 'By checking this box I acknowledge that I have read and agree to the agreement.',
        email_unregistered: 'Sorry, we could not find your account',
        password_invalid: 'The username or password is invalid',
        account_restricted: 'Sorry that your {userAccount} account is restricted, if you have any questions, please contact customer service {customServiceEmail}',
        got_it: 'Got it',
        authorization_error: 'Authorization error',
        success_login: 'Login successfully',

        // 忘记密码
        success_saved: 'Successfully saved'
    },

    // 验证码
    verfication_code: 'Verification Code',
    send_code: 'Send Code',
    sent_code: 'Sending',
    resend_code: 'Resend',

    // 注册页
    register_page: {
        nickname: 'Nickname',

        album: 'Album',
        camera: 'Camera',
        existing_account: 'Sign in using existing account',
        username_taken: 'That username is taken. Try another',
        verfication_code_incorrect: 'The verification code is incorrect',
        verfication_code_expired: 'Verification code has expired',
        success_registered: 'Successfully registered ',
        upload_avatar: 'Upload Avatar', // 新增
        photograph: 'Photograph', // 新增
        edit_avatar: 'Edit Avatar' // 新增

    },

    // 第三方授权绑定邮箱
    thridparty_bind_page: {
        bind_email: 'Bind your Email',
        bind_and_login: 'Bind and log in',
        register_and_bind: 'Register email and bind'
    },

    // 选择区域
    select_area: {
        community_join_title: 'Choose your Community', // 新增
        community_join_sub_title: 'I choose', // 新增
        community_area: 'Community Area',
        community_area_hint: 'You cannot modify it after Joining the community, please choose carefully',
        community_join_confirm: 'Confirm to Join',
        community_join_hint: 'It cannot be modified after joining the community, please confirm to join {communityName} again',
        success_join_community: 'Successfully join the {communityName} community'
    },

    confirm: 'Confirm', // 新增

    // 社区tab & 底部tab
    community: 'community',
    shop: 'Shop',
    me: 'Me',
    all: 'All',
    hot: 'Hot/Trend',

    // 帖子详情页
    posts_detail_page: {
        follow: 'Follow',
        following: 'Following',
        respond: 'Respond/Reply',
        post: 'Post',
        photo: 'Photo',
        link: 'Link',
        save: 'Save',
        cancel: 'Cancel',
        share: 'Share',
        comment: 'Comment',
        block: 'Block/Shield'
    },

    // 帖子发布页
    post_edit_page: {
        album: 'Album',
        next: 'Next',
        get_more_attention: 'Add a title to get more attention',
        say_something: 'Add text (optional)',
        classification: 'Community classification',
        success_post: 'Successfully post',
        fail_post: 'Sent Failed'
    },

    // 搜索页面
    search_page: {
        search: 'Search',
        search_history: 'All search history',
        clear_history: 'Clear history'
    },

    // 个人主页
    my_center_page: {
        likes: 'Likes',
        followers: 'Followers',
        following: 'Following',
        friends: 'Friends',
        post: 'Post',
        get_more_attention: 'Add a title to get more attention',
        delete_post_confirm_hint: 'Are you sure to delete this post?',
        cancel: 'Cancel',
        delete: 'Delete',
        post_missing: 'Post is missing',

        // 他人主页
        no_post_yet: 'No posts yet'
    },

    // 我的消息
    my_messages_page: {
        all_read: 'All read',
        messages: 'Messages',
        replied: 'The comment blogger has replied',
        like_post: 'Liked the post',
        share_post: 'share the post',
        block_post: 'Shield/Block',
        content_missing: 'The content is missing'
    },

    official_news: 'Official News',

    // 我的页面
    my_page: {
        orders: 'My orders',
        more: 'More',
        Post: 'Create/Post',
        account_infomation: 'Account_information',
        name: 'Name',
        gender: 'Gender',
        birth_date: 'Birth Date',
        phone: 'Phone',
        my_location: 'My Location',
        job: 'Career/Job/Profession'
    },

    // set nickname
    username_page: {
        save: 'Save',
        username_hint: 'Use 5 characters or more for your username',
        username_taken: 'That username is taken. Try another',
        username_placeholder: 'Add your name'
    },

    male: 'Male',
    female: 'female',

    // 设置页
    setting_page: {
        setting: 'Setting',
        basic_settings: 'Basic Settings',
        bind_settings: 'Bind Settings', // 新增
        change_password: 'Change Password',
        set_languages: 'Set Language',
        feedback: 'Feedback',
        rating_and_feedback: 'Rating and feedback',
        about_us: 'About us',
        version: 'Version',
        binding_management: 'Binding management',
        bound: 'Bound',
        unbound: 'Unbound',
        logout_button: 'Log out',
        logout: 'Logout', // 新增
        logout_confirm_hint: 'Confirm to log out',
        rate_our_app: 'Rate our app',
        loading: 'Loading',
        unbound_hint: 'Unbinding',
        jump_thirdparty_for_bind: 'Jump to third-party for binding/Go to {thirdParty} to verify',

        facebook: 'Facebook',
        twitter: 'Twitter',
        google: 'Google',
        instagram: 'Instagram',
        apple: 'Apple'
    },

    // 修改密码页
    password_page: {
        save_password: 'Save Password',
        forgot_password: 'Forgot password',
        change_password: 'Change Password', // 换密码

        old_password: 'Old Password',
        old_password_empty_hint: 'Please enter old password',
        new_password: 'New Password',
        new_password_empty_hint: 'Please enter new password',
        success_saved: 'Successfully saved',
        password_invalid_hint: 'Please enter at least 5 characters'
    },

    // 版本页
    version_page: {
        version_update: 'Version Upate',
        version_update_to_date: '{Version}is up to date',
        version_need_update: 'Upgrade to {Version}',
        upgrade: 'Upgrade'
    },

    // 关于我们
    about_us_page: {
        title: 'About Us',
        service: '1. Who May Use the Services',
        content: 'You may use the Services only if you agree to form a binding contract with Twitter and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old, or in the case of Periscope 16 years old, to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words “you” and “your” as used in these Terms shall refer to such entity.'
    },

    feedback_page: {
        title: 'Feedback',
        placeholder: 'Please describe your feedback'
    }

}