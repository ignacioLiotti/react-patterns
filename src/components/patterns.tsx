const patterns = [
  {
    id: 'complex_prop_pattern',
    name: 'Complex Prop Pattern',
    description:
      'A more complex pattern with multiple components and nested prop children.',
    data: {
      id: 'root',
      name: 'ParentComponent',
      left: 50,
      top: 10,
      children: [
        {
          id: 'child1',
          name: 'FirstChild',
          left: -25,
          top: 15,
          children: [
            {
              id: 'grandchild1',
              name: 'FirstGrandChild',
              left: -15,
              top: 20,
              children: [],
            },
            {
              id: 'grandchild2',
              name: 'SecondGrandChild',
              left: 15,
              top: 20,
              children: [],
            },
          ],
        },
        {
          id: 'child2',
          name: 'SecondChild',
          left: 25,
          top: 15,
          children: [
            {
              id: 'child3',
              name: 'FirstChild',
              left: -15,
              top: 20,
              children: [
                {
                  id: 'grandchild3',
                  name: 'ThirdGrandChild',
                  left: -10,
                  top: 25,
                  children: [],
                },
              ],
            },
          ],
          props: {
            passedComponent: 'child1',
            left: 15,
            top: 20,
          },
        },
        {
          id: 'child4',
          name: 'ThirdChild',
          left: 0,
          top: 35,
          children: [],
          props: {
            passedComponent: 'grandchild2',
            left: 0,
            top: 25,
          },
        },
      ],
    },
  },
  
  // {
  //   id: 'simple_pattern',
  //   name: 'Simple Pattern',
  //   description: 'A simple pattern with one parent and two children components.',
  //   data: {
  //     id: 'root',
  //     name: 'ParentComponent',
  //     children: [
  //       {
  //         id: 'child1',
  //         name: 'FirstChild',
  //         children: [],
  //       },
  //       {
  //         id: 'child2',
  //         name: 'SecondChild',
  //         children: [
  //           {
  //             id: '3.1.2.1',
  //             name: 'Grandchild 2.1',
  //             children: [],
  //           },
  //           {
  //             id: '3.1.2.2',
  //             name: 'Grandchild 2.2',
  //             children: [
  //               {
  //                 id: '3.1.2.2.1',
  //                 name: 'Great-grandchild 2.2.1',
  //                 children: [],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
];

export default patterns;