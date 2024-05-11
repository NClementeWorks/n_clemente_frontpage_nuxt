const nav = {
  contact_form: {
    link: '#the_contact_form',
    label: `Let's Join Forces!`,
  },
  stack: {
    link: '#the_expanded_stack',
    label: `Expanded-Stack`,
  }
}

export const useMenu = () => {

  return {
    current_menu: 0,

    nav,

    main_menu: [
      {
        label: `Home`,
        link: '#the_hero',
      },
      
      nav.stack,

      {
        label: `Use Cases`,
        link: '#the_use_cases',
      },
      {
        label: `Top Skills`,
        link: '#the_top_skills',
      },
      {
        ...nav.contact_form,
        highlight: true,
      },
    ],

    contact_info: [
      {
        label: 'Email',
        type: 'email',
        icon: 'envelope',
        data: 'noliani.clemente@proton.me',
      },
    ],

    profile_links: [
      {
        network: 'LinkedIn',
        link: 'http://www.linkedin.com/in/noliani',
      },
      {
        network: 'Behance',
        link: 'http://www.be.net/noliani_clemente',
      },
    ],

    get_href_for_type: ( type : string, link : string ) => {
      switch ( type ) {
        case 'email':
          return `mailto:${ link }`
        default:
          return link
      }
    }

  }
}