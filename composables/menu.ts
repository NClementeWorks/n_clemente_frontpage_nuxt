export const useMenu = () => {

  return {
    current_menu: 0,

    main_menu: [
      {
        label: `Home`,
        link: '#the_hero',
      },
      {
        label: `Expanded-Stack`,
        link: '#the_expanded_stack',
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
        label: `Let's Work!`,
        link: '#the_contact_form',
        highlight: true,
      },
    ],

    contact_info: [
      {
        label: 'Email',
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
    ]

  }
}