/**
 * A list of collections to create initially
 */
const COLLECTIONS = [
  {
    name: 'settings',
    documents: [
      {
        id: 'user',
        roles: [

          /**
           * List all users that should be created initially.
           * Initially created users can only login through
           * third party provides (google, facebook...).
           * If you want to create a user with email/password
           * add an account for him in Authentication in the
           * firebase dashboard.
           */
          {
            email: 'sven.djanis@gmail.com',
            role: 'admin'
          },
          {
            email: 'h.kolaric92@gmail.com',
            role: 'admin'
          },
          {
            email: 'filip.lauc93@gmail.com',
            role: 'admin'
          }
        ]
      },
      {
        id: 'layout',
        navigation: {
          items: [
            {
              icon: 'dashboard',
              label: 'LAYOUT.DASHBOARD',
              type: 'link',
              value: '/dashboard'
            },
            {
              icon: 'web',
              label: 'Pages',
              type: 'link',
              value: '/m/pages/overview'
            },
            {
              icon: 'announcement',
              label: 'Announcements',
              type: 'link',
              value: '/m/announcements/overview'
            },
            {
              icon: 'contacts',
              label: 'Contact Us',
              type: 'link',
              value: '/m/contact-us/overview'
            },
            {
              icon: 'event',
              label: 'Events',
              type: 'link',
              value: '/m/events/overview'
            },
            {
              icon: 'supervised_user_circle',
              label: 'Sponsor Requests',
              type: 'link',
              value: '/m/sponsor-requests/overview'
            },
            {
              children: [
                {
                  icon: 'supervised_user_circle',
                  label: 'GENERAL.USERS',
                  type: 'link',
                  value: '/m/users/overview'
                },
                {
                  icon: 'vpn_key',
                  label: 'GENERAL.ROLES',
                  type: 'link',
                  value: '/m/roles/overview'
                }
              ],
              icon: 'account_box',
              label: 'LAYOUT.MANAGEMENT',
              type: 'expandable'
            },
            {
              children: [
                {
                  icon: 'view_module',
                  label: 'LAYOUT.MODULES',
                  type: 'link',
                  value: '/module-definition/overview'
                },
                {
                  icon: 'settings',
                  label: 'LAYOUT.SETTINGS',
                  type: 'link',
                  value: '/settings'
                }
              ],
              icon: 'dns',
              label: 'LAYOUT.SYSTEM',
              type: 'expandable'
            }
          ]
        }
      }
    ]
  },
  {
    name: 'roles',
    documents: [
      {
        id: 'admin',
        name: 'Admin',
        description: 'A user with access to all collections',
        createdOn: Date.now()
      },
      {
        id: 'user',
        name: 'User',
        description: 'A user with limited application access',
        createdOn: Date.now()
      }
    ]
  },
];

const MODULES = [
  {
    id: 'users',
    name: 'Users',
    description: 'App Users',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/createdOn',
            '/id',
            '/name',
            '/email',
            '/role'
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/createdOn',
            label: 'Created On',
            pipe: ['date'],
            sortable: true
          },
          {
            key: '/name',
            label: 'Name'
          },
          {
            key: '/email',
            label: 'Email'
          },
          {
            key: '/role',
            label: 'Role',
            control: true
          }
        ],
        actions: [
          {
            value: `it => '<jms-e-tpr data-email="' + it.data.email + '"></jms-e-tpr>'`
          },
          {
            value: `it => '<jms-e-cp data-id="' + it.id + '"></jms-e-cp>'`
          },
          {
            value: `it => '<jms-e-tus data-id="' + it.id + '"></jms-e-tus>'`
          }
        ]
      },
      overview: {
        toolbar: ['<jms-e-user-add></jms-e-user-add>']
      }
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'number'
        },
        createdOn: {
          type: 'number'
        },
        role: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name'
      },
      email: {
        label: 'Email',
        component: {
          type: 'input',
          configuration: {
            type: 'email'
          }
        }
      },
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        }
      },
      role: {
        label: 'Role',
        component: {
          type: 'select',
          configuration: {
            populate: {
              collection: 'roles',
              orderBy: 'name'
            }
          }
        }
      }
    }
  },
  {
    id: 'roles',
    name: 'Roles',
    description: 'Collection of roles that can be assigned to users',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 1,
      editTitleKey: 'name',
      icon: 'vpn_key',
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/createdOn',
            '/name',
            '/description'
          ]
        }]
      },
      table: {
        tableColumns: [
          {
            key: '/createdOn',
            label: 'Created On',
            pipe: ['date'],
            sortable: true
          },
          {
            key: '/name',
            label: 'Name'
          },
          {
            key: '/description',
            label: 'Description'
          }
        ]
      }
    },
    schema: {
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        createdOn: {
          type: 'number'
        }
      }
    },
    definitions: {
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        },
        columnsDesktop: 4,
        columnsMobile: 12
      },
      name: {
        label: 'Name',
        columnsDesktop: 4,
        columnsMobile: 12
      },
      description: {
        label: 'Description',
        component: {
          type: 'textarea'
        },
        columnsDesktop: 4,
        columnsMobile: 12
      }
    }
  },
  {
    id: 'contact-us',
    name: 'Contact us',
    description: 'Contact us',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/createdOn',
            '/id',
            '/name',
            '/email',
            '/message',
            '/subject'
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/createdOn',
            label: 'Created On',
            pipe: ['date'],
            sortable: true
          },
          {
            key: '/name',
            label: 'Name'
          },
          {
            key: '/email',
            label: 'Email'
          },
          {
            key: '/subject',
            label: 'Subject',
          }
        ],
        actions: [
        ]
      },
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string'
        },
        message: {
          type: 'string'
        },
        createdOn: {
          type: 'number'
        },
        subject: {
          type: 'string'
        }
      }
    },
    definitions: {
      id: {
        type: 'ID'
      },
      name: {
        label: 'Name',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
      email: {
        label: 'Email',
        component: {
          type: 'input',
          configuration: {
            type: 'email'
          }
        }
      },
      subject: {
        label: 'Subject',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        }
      },
      message: {
        label: 'Message',
        component: {
          type: 'textarea',
          configuration: {
            type: 'email'
          }
        }
      },
    }
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Announcements',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'title',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'title',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/title',
            '/content',
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title'
          },
        ]
      },
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        content: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
      },
    },
    definitions: {
      id: {
        type: 'ID'
      },
      title: {
        label: 'Title'
      },
      content: {
        label: 'Content',
        component: {
          type: 'tinymce'
        }
      },
    }
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Events',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'title',
      icon: 'supervised_user_circle',
      sort: {
        active: 'createdOn',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/title',
            '/createdOn',
            '/from',
            '/to',
            '/description',
            '/content',
            '/readMore',
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title'
          },
          {
            key: '/createdOn',
            label: 'Created On'
          },
        ]
      },
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string',
        },
        createdOn: {
          type: 'number'
        },
        from: {
          type: 'number'
        },
        to: {
          type: 'number'
        },
        description: {
          type: 'string'
        },
        content: {
          type: 'string'
        },
        readMore: {
          type: 'string'
        }
      },
    },
    definitions: {
      id: {
        type: 'ID'
      },
      title: {
        label: 'Title',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
      description: {
        label: 'description',
        component: {
          type: 'tinymce'
        }
      },
      content: {
        label: 'Content',
        component: {
          type: 'tinymce'
        }
      },
      createdOn: {
        label: 'Created On',
        formatOnLoad: '(value) => value || Date.now()',
        component: {
          type: 'date',
          configuration: {
            format: 'number'
          }
        }
      },
      to: {
        label: 'To',
        component: {
          type: 'date',
          configuration: {
            type: 'number'
          }
        }
      },
      from: {
        label: 'From',
        component: {
          type: 'date',
          configuration: {
            type: 'number'
          }
        }
      },
      readMore: {
        label: 'Read More',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
    }
  },
  {
    id: 'sponsor-requests',
    name: 'sponsor-requests',
    description: 'sponsor-requests',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'name',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'name',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/email',
            '/name',
            '/phone',
            '/address',
            '/city',
            '/postalCode',
            '/country',
            '/institution',
            '/department',
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/id',
            label: 'Id',
            sortable: true
          },
          {
            key: '/email',
            label: 'Email'
          },
          {
            key: '/phone',
            label: 'Phone'
          },
        ],
        actions: [
        ]
      },
    },
    schema: {
      properties: {
        email: {
          type: 'string'
        },
        name: {
          type: 'string',
        },
        phone: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        postalCode: {
          type: 'string'
        },
        country: {
          type: 'string'
        },
        institution: {
          type: 'string'
        },
        department: {
          type: 'string'
        }
      },
    },
    definitions: {
      id: {
        type: 'ID'
      },
      email: {
        label: 'Email',
      },
      name: {
        label: 'Name',
      },
      phone: {
        label: 'Phone',
      },
      address: {
        label: 'Address',
      },
      city: {
        label: 'City',
      },
      postalCode: {
        label: 'Postal Code',
      },
      country: {
        label: 'Country',
      },
      institution: {
        label: 'Institution',
      },
      department: {
        label: 'Department',
      }
    }
  },
  {
    id: 'pages',
    name: 'pages',
    description: 'pages',
    authorization: {
      read: ['admin'],
      write: ['admin']
    },
    layout: {
      order: 0,
      editTitleKey: 'title',
      icon: 'supervised_user_circle',
      filterModule: {},
      sort: {
        active: 'title',
        direction: 'desc'
      },
      instance: {
        segments: [{
          fields: [
            '/title',
            '/content'
          ]
        }]
      },
      table: {
        hideImport: true,
        tableColumns: [
          {
            key: '/title',
            label: 'Title'
          },
        ],
      },
    },
    schema: {
      properties: {
        id: {
          type: 'string'
        },
        content: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
      },
    },
    definitions: {
      id: {
        type: 'ID'
      },
      title: {
        label: 'Title',
        component: {
          type: 'input',
          configuration: {
            type: 'string'
          }
        }
      },
      content: {
        label: 'Content',
        component: {
          type: 'tinymce'
        }
      },
    }
  },
];

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

/**
 * Add your firebase config
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://intl-glyco.firebaseio.com"
});

async function exec() {
  const fStore = admin.firestore();

  for (const collection of COLLECTIONS) {
    for (const document of collection.documents) {

      const {id, ...data} = document;

      await fStore.collection(collection.name).doc(id).set(data);
    }
  }

  for (const module of MODULES) {

    const {id, ...data} = module;

    await fStore.collection('modules').doc(id).set({
      ...data,
      createdOn: Date.now()
    });
  }
}

exec()
  .then(() => {
    console.log('Setup completely successfully');
  })
  .catch(error => {
    console.error(error);
  });


