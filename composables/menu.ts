const links = {
  contact_form: '#the_contact_form',
  stack: '#the_expanded_stack',
}

export const useMenu = () => {

  return {
    current_menu: 0,

    links,

    main_menu: [
      {
        label: `Home`,
        link: '#the_hero',
      },
      {
        label: `Expanded-Stack`,
        link: links.stack,
      },
      {
        label: `Use Cases`,
        link: '#the_use_cases',
      },
      {
        label: `Resume Top Skills`,
        link: '#the_top_skills',
      },
      {
        label: `Let's Join Forces!`,
        link: links.contact_form,
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