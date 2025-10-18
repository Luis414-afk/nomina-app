/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading = false;

  coursesList: any[] = [
    {
      "name": "C Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cp1.png",
          "link_name": "C in Depth: The Complete C Programming Guide for Beginners",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cp2.png",
          "link_name": "C Programming For Beginners",
          "retail_price": 145.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cp3.png",
          "link_name": "Learn and Master C Programming For Absolute Beginners!",
          "retail_price": 200.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cp4.png",
          "link_name": "C Programming - Complete Tutorial For Beginners",
          "retail_price": 95.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cp5.png",
          "link_name": "C Programming For Beginners",
          "retail_price": 20.0
        }
      ]
    },
    {
      "name": "C++ Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cpp1.png",
          "link_name": "The Unreal Engine Developer Course - Learn C++ & Make Games",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cpp2.png",
          "link_name": "Learn to Program with C++",
          "retail_price": 50.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cpp3.png",
          "link_name": "C++: From Beginner to Expert",
          "retail_price": 70.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cpp4.png",
          "link_name": "Learn and Understand C++",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "It & Software",
          "image_url": "assets/images/courses/cpp5.png",
          "link_name": "Build an Advanced Keylogger using C++ for Ethical Hacking!",
          "retail_price": 195.0
        }
      ]
    },
    {
      "name": "GoLang Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/go1.png",
          "link_name": "Go: The Complete Developer's Guide (Golang)",
          "retail_price": 85.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/go2.png",
          "link_name": "Getting started with Cloud Native Go",
          "retail_price": 125.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/go3.png",
          "link_name": "The Complete Google Go Programming Course For Beginners",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/go4.png",
          "link_name": "The Complete Google's Go (golang) Programming Course",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/go5.png",
          "link_name": "Go: Building 7 Real-World Projects",
          "retail_price": 200.0
        }
      ]
    },
    {
      "name": "HTML Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/html1.png",
          "link_name": "Build Responsive Real World Websites with HTML5 and CSS3",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/html2.png",
          "link_name": "Step By Step HTML and CSS course for beginners",
          "retail_price": 120.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/html3.png",
          "link_name": "The Complete HTML and CSS Course For Beginners",
          "retail_price": 85.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/html4.png",
          "link_name": "Build Websites from Scratch with HTML & CSS",
          "retail_price": 145.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/html5.png",
          "link_name": "A Web Development Crash Course in HTML5 and CSS3",
          "retail_price": 40.0
        }
      ]
    },
    {
      "name": "JavaScript Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/js1.png",
          "link_name": "The Complete JavaScript Course: Build a Real-World Project",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/js2.png",
          "link_name": "ES6 Javascript: The Complete Developer's Guide",
          "retail_price": 80.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/js3.png",
          "link_name": "JavaScript: Understanding the Weird Parts",
          "retail_price": 175.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/js4.png",
          "link_name": "JavaScript - Step By Step Guide For Beginners",
          "retail_price": 115.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/js5.png",
          "link_name": "The Complete JavaScript Course - Beginner to Professional",
          "retail_price": 200.0
        }
      ]
    },
    {
      "name": "Perl Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/perl1.png",
          "link_name": "Perl Programming for Beginners",
          "retail_price": 100.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/perl2.png",
          "link_name": "Perl Building Blocks - An Introduction to Perl",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/perl3.png",
          "link_name": "Perl for Beginners: Learn A to Z of Perl Scripting Hands-on",
          "retail_price": 200.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/perl4.png",
          "link_name": "Getting Started with Perl for Beginners",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/perl5.png",
          "link_name": "Learn Perl 5 By Doing It",
          "retail_price": 25.0
        }
      ]
    },
    {
      "name": "PHP Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/php1.png",
          "link_name": "Create a Spotify Clone from Scratch - JavaScript, PHP, MySQL",
          "retail_price": 50.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/php2.png",
          "link_name": "PHP For Absolute Beginners",
          "retail_price": 100.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/php3.png",
          "link_name": "PHP For WordPress Development",
          "retail_price": 35.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/php4.png",
          "link_name": "Write PHP Like a Pro: Build a PHP MVC Framework From Scratch",
          "retail_price": 70.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/php5.png",
          "link_name": "Complete PHP Course With Bootstrap3 CMS System & Admin Panel",
          "retail_price": 195.0
        }
      ]
    },
    {
      "name": "C# Development",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cs1.png",
          "link_name": "Learn to Code by Making Games - Complete C# Unity Developer",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cs2.png",
          "link_name": "C# Basics - For Complete Beginners",
          "retail_price": 20.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cs3.png",
          "link_name": "C# Basics for Beginners: Learn C# Fundamentals by Coding",
          "retail_price": 180.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cs4.png",
          "link_name": "C# Programming Crash Course",
          "retail_price": 150.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/cs5.png",
          "link_name": "C# Basics - Learn to Code the Hard Way",
          "retail_price": 30.0
        }
      ]
    },
    {
      "name": "JAVA Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/java1.png",
          "link_name": "Complete Java Masterclass",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/java2.png",
          "link_name": "Become a Junior Java Software Developer",
          "retail_price": 175.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/java3.png",
          "link_name": "Java In-Depth: Become a Complete Java Engineer!",
          "retail_price": 120.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/java4.png",
          "link_name": "Java for Absolute Beginners",
          "retail_price": 20.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/java5.png",
          "link_name": "JSP, Servlets and JDBC for Beginners: Build a Database App",
          "retail_price": 95.0
        }
      ]
    },
    {
      "name": "Ruby Programming",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/ruby1.png",
          "link_name": "The Complete Ruby on Rails Developer Course",
          "retail_price": 195.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/ruby2.png",
          "link_name": "One-stop Ruby on Rails: Build Web Applications from Scratch",
          "retail_price": 145.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/ruby3.png",
          "link_name": "Learn to Code with Ruby",
          "retail_price": 30.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/ruby4.png",
          "link_name": "Comprehensive Ruby Programming",
          "retail_price": 40.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/ruby5.png",
          "link_name": "Ruby Programming for Beginners",
          "retail_price": 75.0
        }
      ]
    },
    {
      "name": "Linux Shell",
      "list": [
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/linux1.png",
          "link_name": "Learn Basic Commands in Linux Shell",
          "retail_price": 95.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/linux2.png",
          "link_name": "Linux Shell Programming for Beginners",
          "retail_price": 40.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/linux3.png",
          "link_name": "Learn Bash Shell in Linux for Beginners - Lite",
          "retail_price": 20.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/linux4.png",
          "link_name": "Learn Bash Shell in Linux for Beginners",
          "retail_price": 35.0
        },
        {
          "advertiser": "Udemy",
          "category": "Development",
          "image_url": "assets/images/courses/linux5.png",
          "link_name": "Shell Scripting: Discover How to Automate Command Line Tasks",
          "retail_price": 95.0
        }
      ]
    }
  ];

  categories: any[] = [
    "Credencial digital",
    "Recibos de nomina",
    "Cambiar Contraseña",
    "Noticias",
    "Fechas de descanso",
 
  ];
  countryCodes: any[] = [];

  offerList: any[] = [
    {
      "title": "25% OFF",
      "name": "Limited time offer - act fast and save! to make a purchase quickly.",
      "desc": "Creating a sense of urgency can encourage customers to make a purchase quickly."
    },
    {
      "title": "50% OFF",
      "name": "Experience the best for less with our exclusive offer",
      "desc": "Bundling products together can be an effective way to offer value to customers."
    },
    {
      "title": "30% OFF",
      "name": "Unbeatable deals you won't find anywhere else",
      "desc": "Encouraging repeat business can be achieved by offering customers rewards for their loyalty. "
    },
    {
      "title": "40% OFF",
      "name": "Upgrade your life with our amazing deals expand a customer base",
      "desc": "Encouraging customers to refer their friends  can be a great way to expand a customer base"
    },
    {
      "title": "85% OFF",
      "name": "Get more bang for your buck with our promotions",
      "desc": "Running a contest or giveaway can create buzz and excitement around a product or service."
    },
    {
      "title": "75% OFF",
      "name": "Don't miss out on this incredible deal their loyalty",
      "desc": " Encouraging repeat business can be achieved by offering customers rewards for their loyalty"
    },
    {
      "title": "65% OFF",
      "name": "The time to save is now any financial commitment",
      "desc": "Offering a free trial period can entice customers to try out a product or service without commitment"
    },
    {
      "title": "95% OFF",
      "name": "Make your money go further with our promotions",
      "desc": "Join our loyalty program and receive exclusive discounts and rewards!"
    },
    {
      "title": "45% OFF",
      "name": "Exclusive deals for our loyal customers next purchase",
      "desc": "Sign up for our newsletter and receive 10% off your next purchase!"
    },
  ];

  userList: any[] = [
    {
      "image": "assets/images/avatar/1.jpg",
      "name": "Richard G. Oneal",
      "subject": "SEO & Marketing"
    },
    {
      "image": "assets/images/avatar/2.jpg",
      "name": "Floyd M. Helton",
      "subject": "3D Design"
    },
    {
      "image": "assets/images/avatar/3.jpg",
      "name": "Matthew M. Hernandez",
      "subject": "Finance & Accounting"
    },
    {
      "image": "assets/images/avatar/4.jpg",
      "name": "Candice M. Coffey",
      "subject": "Graphic Design"
    },
    {
      "image": "assets/images/avatar/5.jpg",
      "name": "Terrie R. Cobb",
      "subject": "3D Design"
    },
    {
      "image": "assets/images/avatar/6.jpg",
      "name": "Clarissa C. Wentz",
      "subject": "SEO & Marketing"
    },
    {
      "image": "assets/images/avatar/7.jpg",
      "name": "Shirley J. Arnold",
      "subject": "Finance & Accounting"
    },
    {
      "image": "assets/images/avatar/8.jpg",
      "name": "Jack R. Applegate",
      "subject": "Graphic Design"
    },
    {
      "image": "assets/images/avatar/9.jpg",
      "name": "Anita T. Ross",
      "subject": "SEO & Marketing"
    },
    {
      "image": "assets/images/avatar/10.jpg",
      "name": "Dianna K. Wadley",
      "subject": "Office Productivity"
    },
    {
      "image": "assets/images/avatar/11.jpg",
      "name": "Rodney R. Ruddy",
      "subject": "Graphic Design"
    },
    {
      "image": "assets/images/avatar/12.jpg",
      "name": "Deanna B. Mull",
      "subject": "3D Design"
    },
    {
      "image": "assets/images/avatar/13.jpg",
      "name": "Michael C. Phelan",
      "subject": "Web Development"
    },
    {
      "image": "assets/images/avatar/14.jpg",
      "name": "Lorraine S. Jones",
      "subject": "Office Productivity"
    },
    {
      "image": "assets/images/avatar/15.jpg",
      "name": "Philip J. Watson",
      "subject": "Personal Development"
    },
    {
      "image": "assets/images/avatar/16.jpg",
      "name": "Patricia R. James",
      "subject": "Finance & Accounting"
    },
    {
      "image": "assets/images/avatar/17.jpg",
      "name": "Dena C. Fernandez",
      "subject": "Web Development"
    },
    {
      "image": "assets/images/avatar/18.jpg",
      "name": "Troy S. Gaines",
      "subject": "HR Management"
    },
    {
      "image": "assets/images/avatar/19.jpg",
      "name": "Robin K. Miller",
      "subject": "Office Productivity"
    },
    {
      "image": "assets/images/avatar/20.jpg",
      "name": "Willie K. Rothermel",
      "subject": "Personal Development"
    },
  ];

  topCategories: any[] = [
    {
      "image": "assets/images/categories/3d.png",
      "name": "3D Design"
    },
    {
      "image": "assets/images/categories/graphics.png",
      "name": "Graphic Design"
    },
    {
      "image": "assets/images/categories/web-development.png",
      "name": "Web Development"
    },
    {
      "image": "assets/images/categories/seo.png",
      "name": "SEO & Marketing"
    },
    {
      "image": "assets/images/categories/finance.png",
      "name": "Finance & Accounting"
    },
    {
      "image": "assets/images/categories/developing.png",
      "name": "Personal Development"
    },
    {
      "image": "assets/images/categories/working.png",
      "name": "Office Productivity"
    },
    {
      "image": "assets/images/categories/human-resources.png",
      "name": "HR Management"
    },
  ];

  curriculcumList: any[] = [
    {
      "name": "Introduction to Graphic Design: Essential Principles and Techniques",
      "time": "25 Min.",
      "number": "01"
    },
    {
      "name": "Mastering Adobe Photoshop: A Comprehensive Guide for Graphic Designers",
      "time": "15 Min.",
      "number": "02"
    },
    {
      "name": "Typography Fundamentals: How to Choose and Use the Right Typefaces",
      "time": "35 Min.",
      "number": "03"
    },
    {
      "name": "Creating Effective Visual Brand Identities: From Logo Design to Brand Guidelines",
      "time": "10 Min.",
      "number": "04"
    },
    {
      "name": "Web Design Basics: Building Beautiful and User-Friendly Websites",
      "time": "20 Min.",
      "number": "05"
    },
    {
      "name": "Designing for Print: Layout, Composition, and Color Theory",
      "time": "45 Min.",
      "number": "06"
    },
    {
      "name": "Digital Illustration Techniques: From Sketching to Final Artwork",
      "time": "50 Min.",
      "number": "07"
    },
    {
      "name": "Design Thinking for Problem-Solving: A Hands-On Approach",
      "time": "10 Min.",
      "number": "08"
    },
    {
      "name": "Portfolio Development for Graphic Designers: Showcasing Your Best Work",
      "time": "22 Min.",
      "number": "09"
    },
    {
      "name": "Advanced Graphic Design Techniques: Pushing the Boundaries of Creativity",
      "time": "25 Min.",
      "number": "10"
    },
  ];

  chatList: any[] = [
    {
      "from": "a",
      "message": "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!😄😄"
    },
    {
      "from": "b",
      "message": "	😃	😃	😃Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
    },
    {
      "from": "a",
      "message": "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You can then edit a message by clicking on it. This way you can change the text, status (check marks) and time. You can also determine whether the message was sent by the sender (right) or receiver (left)."
    },
    {
      "from": "a",
      "message": "😀😀You can change the order of messages by dragging and dropping them."
    },
    {
      "from": "b",
      "message": "Finally, click  (top right) to download your fake chat as an image."
    },
    {
      "from": "a",
      "message": "😀😀Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You also have the facility to hide the header and footer if needed."
    },
    {
      "from": "a",
      "message": "😀😀😀Customize the clock time and battery percentage as per your satisfaction."
    },
    {
      "from": "b",
      "message": "Now, make all the required changes for Person 2 also."
    },
    {
      "from": "a",
      "message": "If satisfied, download the chat and share with all your close friends and relatives, and note their reactions."
    },
    {
      "from": "b",
      "message": "😀😀Privacy comes first. Our tool does not store any data or chats by keeping in mind the privacy of our users"
    },
    {
      "from": "a",
      "message": "😀😀😀😀Our android text generator tool has an easy-to-use interface for the ease of the users. Also, the results generated by our tool are fast and realistic"
    },
    {
      "from": "b",
      "message": "Message privately. End-to-end encryption and privacy controls. Stay connected. Message and call for free* around the world. Build community. Group conversations made simple. Express yourself. Say it with stickers, voice, GIFs and more. WhatsApp business. Reach your customers from anywhere."
    },
    {
      "from": "a",
      "message": "Send a single message to multiple people at once"
    },
    {
      "from": "b",
      "message": "You can now send messages in bold, italics or strikethrough too. Simply use the special characters before and after the words to get the formatting of your choice"
    },
    {
      "from": "a",
      "message": "If you want to know who you are chatting too much with on WhatsApp, you can find out by simply scrolling through the chat screen"
    }
  ];

  languagesList: any[] = [
    "English (US)",
    "English (UK)",
    "हिंदी",
    "日本",
    "తెలుగు",
    "Turkish",
    "Tagalog",
    "Burmese",
    "Lingala",
    "Yoruba",
    "Bhojpuri",
  ];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private zone: NgZone,
    private http: HttpClient,
  ) {
    this.getLocalAssets('country.json').then((data: any) => {
      this.countryCodes = data;
    });
  }

  changeMenuItems(action: boolean) {
    this.menuCtrl.enable(action);
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

  navigateToPage(routes: any, param?: NavigationExtras | undefined) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }

  navigateRoot(routes: any | string) {
    this.zone.run(() => {
      this.navCtrl.navigateRoot([routes]);
    });
  }

  getKeys(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.getItem(key))
    });
  }

  clearKeys(key: string) {
    // this.storage.remove(key);
    localStorage.removeItem(key);
  }

  setKeys(key: string, value: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    });
  }

  async show(msg?: string | null) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg && msg != '' && msg != null ? msg : '',
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */
  async showWarningAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSimpleAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email: string) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: 'Please enter valid email',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }


  /*
    Show Toast Message on Screen
     param : msg = message to display, color= background
     color of toast example dark,danger,light. position  = position of message example top,bottom
     Call this method to show toast message
     */

  async showToast(msg: any, colors: any, positon: any) {


    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  async shoNotification(msg: any, colors: any, positon: any) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  async errorToast(msg: any, color?: string | (string & Record<never, never>) | undefined) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  onBack() {
    this.navCtrl.back();
  }

  makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public getLocalAssets(name: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.get('assets/json/' + name, header).subscribe((data) => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}
