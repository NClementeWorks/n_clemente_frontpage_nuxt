export const useMenu = () => {

  return {
    main_menu: [
      {
        label: `Home`,
        link: '#the_hero',
      },
      {
        label: `Expanded-Stack`,
        link: '#',
      },
      {
        label: `Use Cases`,
        link: '#',
      },
      {
        label: `Resume Top Skills`,
        link: '#',
      },
      {
        label: `Let's Work!`,
        link: '#',
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