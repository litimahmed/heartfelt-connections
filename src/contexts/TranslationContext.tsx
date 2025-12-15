// Import necessary hooks and types from React
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure for a single translation entry, which includes a key and translations for English, French, and Arabic.
interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}

// Store all translation strings for the application. Each key maps to an object with 'en', 'fr', and 'ar' translations.
const translations: Translations = {
  // Header
  'nav.partnerships': { en: 'Partnerships', fr: 'Partenariats', ar: 'الشراكات' },
  'nav.aboutUs': { en: 'About Us', fr: 'À propos', ar: 'من نحن' },
  'nav.privacy': { en: 'Privacy & Policy', fr: 'Confidentialité', ar: 'الخصوصية' },
  'nav.contact': { en: 'Contact Us', fr: 'Contact', ar: 'اتصل بنا' },
  'nav.clientPortal': { en: 'Client Portal', fr: 'Espace Client', ar: 'بوابة العميل' },
  'nav.signin': { en: 'Professional Access', fr: 'Accès Professionnel', ar: 'دخول المحترفين' },
  
  // Hero
  'hero.title': { en: 'Smart Queue Management', fr: 'Gestion intelligente des files', ar: 'إدارة ذكية للطوابير' },
  'hero.subtitle': { en: 'Eliminate wait times with AI-powered scheduling and real-time queue monitoring for exceptional service delivery.', fr: 'Éliminez les temps d\'attente grâce à la planification basée sur l\'IA et à la surveillance en temps réel des files pour une prestation de service exceptionnelle.', ar: 'القضاء على أوقات الانتظار من خلال الجدولة الذكية ومراقبة الطوابير في الوقت الفعلي لتقديم خدمة استثنائية.' },
  'hero.cta': { en: 'Start Free Trial', fr: 'Démarrer l\'essai gratuit', ar: 'ابدأ التجربة المجانية' },
  'hero.demo': { en: 'Watch Demo', fr: 'Voir la démo', ar: 'شاهد العرض التوضيحي' },
  'hero.trusted': { en: 'Trusted by 25,000+ businesses worldwide', fr: 'Plus de 25 000 entreprises nous font confiance', ar: 'موثوق به من قبل أكثر من 25,000 شركة عالمياً' },
  'hero.stat1': { en: 'Active Users', fr: 'Utilisateurs actifs', ar: 'مستخدم نشط' },
  'hero.stat2': { en: 'Daily Appointments', fr: 'Rendez-vous quotidiens', ar: 'موعد يومي' },
  'hero.stat3': { en: 'Average Time Saved', fr: 'Temps économisé en moyenne', ar: 'وقت تم توفيره في المتوسط' },
  
  // Partnerships
  'partnerships.title': { en: 'Our Trusted Partnerships', fr: 'Nos partenariats de confiance', ar: 'شراكاتنا الموثوقة' },
  'partnerships.subtitle': { en: 'We collaborate with leading organizations to deliver exceptional service', fr: 'Nous collaborons avec des organisations de premier plan pour offrir un service exceptionnel', ar: 'نتعاون مع المنظمات الرائدة لتقديم خدمة استثنائية' },
  
  // About Us
  'about.tagline': { en: 'WHO WE ARE', fr: 'QUI NOUS SOMMES', ar: 'من نحن' },
  'about.title': { en: 'About Toorrii', fr: 'À propos de Toorrii', ar: 'عن توريي' },
  'about.subtitle': { en: 'We are dedicated to revolutionizing how businesses manage appointments and queues', fr: 'Nous nous consacrons à révolutionner la façon dont les entreprises gèrent les rendez-vous et les files d\'attente', ar: 'نحن ملتزمون بإحداث ثورة في كيفية إدارة الشركات للمواعيد والطوابير' },
  'about.mission': { en: 'Our Mission', fr: 'Notre Mission', ar: 'مهمتنا' },
  'about.missionDesc': { en: 'Transform how businesses interact with customers through intelligent queue management', fr: 'Transformer la façon dont les entreprises interagissent avec les clients grâce à une gestion intelligente des files', ar: 'تحويل كيفية تفاعل الشركات مع العملاء من خلال الإدارة الذكية للطوابير' },
  'about.innovation': { en: 'Innovation First', fr: 'Innovation d\'abord', ar: 'الابتكار أولاً' },
  'about.innovationDesc': { en: 'Cutting-edge technology that adapts to your business needs and scales with growth', fr: 'Technologie de pointe qui s\'adapte aux besoins de votre entreprise et évolue avec la croissance', ar: 'تكنولوجيا متطورة تتكيف مع احتياجات عملك وتنمو مع نموك' },
  'about.customer': { en: 'Customer Focused', fr: 'Centré sur le client', ar: 'التركيز على العملاء' },
  'about.customerDesc': { en: 'Every feature designed to enhance user experience and satisfaction', fr: 'Chaque fonctionnalité conçue pour améliorer l\'expérience et la satisfaction des utilisateurs', ar: 'كل ميزة مصممة لتحسين تجربة المستخدم ورضاه' },
  'about.excellence': { en: 'Excellence', fr: 'Excellence', ar: 'التميز' },
  'about.excellenceDesc': { en: 'Committed to delivering the highest quality service and support', fr: 'Engagés à fournir un service et un support de la plus haute qualité', ar: 'ملتزمون بتقديم خدمة ودعم بأعلى جودة' },
  'about.readMore': { en: 'Learn More About Us', fr: 'En savoir plus', ar: 'اعرف المزيد عنا' },
  
  // Privacy
  'privacy.title': { en: 'Privacy & Security', fr: 'Confidentialité et sécurité', ar: 'الخصوصية والأمان' },
  'privacy.subtitle': { en: 'Your privacy and data security are our top priorities', fr: 'Votre confidentialité et la sécurité de vos données sont nos priorités absolues', ar: 'خصوصيتك وأمان بياناتك هما أولوياتنا القصوى' },
  'privacy.description': { en: 'We are committed to protecting your personal information and ensuring transparency in how we collect, use, and safeguard your data. Our comprehensive privacy policy outlines our practices and your rights regarding your information.', fr: 'Nous nous engageons à protéger vos informations personnelles et à garantir la transparence dans la façon dont nous collectons, utilisons et protégeons vos données. Notre politique de confidentialité complète décrit nos pratiques et vos droits concernant vos informations.', ar: 'نحن ملتزمون بحماية معلوماتك الشخصية وضمان الشفافية في كيفية جمعنا واستخدامنا وحماية بياناتك. تحدد سياسة الخصوصية الشاملة لدينا ممارساتنا وحقوقك فيما يتعلق بمعلوماتك.' },
  'privacy.dataProtection': { en: 'Data Protection', fr: 'Protection des données', ar: 'حماية البيانات' },
  'privacy.dataProtectionDesc': { en: 'Your data is protected with industry-leading security measures and protocols', fr: 'Vos données sont protégées par des mesures et protocoles de sécurité de pointe', ar: 'بياناتك محمية بإجراءات وبروتوكولات أمان رائدة في الصناعة' },
  'privacy.encryption': { en: 'End-to-End Encryption', fr: 'Chiffrement de bout en bout', ar: 'التشفير من طرف إلى طرف' },
  'privacy.encryptionDesc': { en: 'All sensitive information is encrypted during transmission and storage', fr: 'Toutes les informations sensibles sont cryptées pendant la transmission et le stockage', ar: 'يتم تشفير جميع المعلومات الحساسة أثناء النقل والتخزين' },
  'privacy.transparency': { en: 'Full Transparency', fr: 'Transparence totale', ar: 'شفافية كاملة' },
  'privacy.transparencyDesc': { en: 'Clear communication about how your data is collected, used, and stored', fr: 'Communication claire sur la façon dont vos données sont collectées, utilisées et stockées', ar: 'تواصل واضح حول كيفية جمع بياناتك واستخدامها وتخزينها' },
  'privacy.compliance': { en: 'GDPR Compliant', fr: 'Conforme au RGPD', ar: 'متوافق مع اللائحة العامة لحماية البيانات' },
  'privacy.complianceDesc': { en: 'Fully compliant with international data protection regulations', fr: 'Entièrement conforme aux réglementations internationales de protection des données', ar: 'متوافق تماماً مع لوائح حماية البيانات الدولية' },
  'privacy.readMore': { en: 'Read Full Privacy Policy', fr: 'Lire la politique complète', ar: 'اقرأ سياسة الخصوصية الكاملة' },
  
  // Contact
  'contact.title': { en: 'Contact Us', fr: 'Contactez-nous', ar: 'اتصل بنا' },
  'contact.subtitle': { en: 'Get in touch with our team. We\'re here to help you with any questions or concerns.', fr: 'Contactez notre équipe. Nous sommes là pour vous aider avec toutes vos questions ou préoccupations.', ar: 'تواصل مع فريقنا. نحن هنا لمساعدتك في أي أسئلة أو مخاوف.' },
  'contact.email': { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
  'contact.phone': { en: 'Phone', fr: 'Téléphone', ar: 'الهاتف' },
  'contact.location': { en: 'Location', fr: 'Localisation', ar: 'الموقع' },
  'contact.hours': { en: 'Business Hours', fr: 'Heures d\'ouverture', ar: 'ساعات العمل' },
  'contact.hoursValue': { en: 'Monday - Friday: 9:00 AM - 6:00 PM', fr: 'Lundi - Vendredi : 9h00 - 18h00', ar: 'الإثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً' },
  'contact.getStarted': { en: 'Ready to Get Started?', fr: 'Prêt à commencer ?', ar: 'هل أنت مستعد للبدء؟' },
  'contact.getStartedDesc': { en: 'Contact us today to learn more about how our queue management system can benefit your business.', fr: 'Contactez-nous dès aujourd\'hui pour en savoir plus sur la façon dont notre système de gestion des files d\'attente peut bénéficier à votre entreprise.', ar: 'اتصل بنا اليوم لمعرفة المزيد حول كيف يمكن لنظام إدارة الطوابير لدينا أن يفيد عملك.' },
  'contact.sendMessage': { en: 'Send Us a Message', fr: 'Envoyez-nous un message', ar: 'أرسل لنا رسالة' },
  
  // Contact Page
  'contactPage.name': { en: 'Name', fr: 'Nom', ar: 'الاسم' },
  'contactPage.namePlaceholder': { en: 'Your name', fr: 'Votre nom', ar: 'اسمك' },
  'contactPage.email': { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
  'contactPage.emailPlaceholder': { en: 'your.email@example.com', fr: 'votre.email@exemple.com', ar: 'بريدك@مثال.com' },
  'contactPage.subject': { en: 'Subject', fr: 'Objet', ar: 'الموضوع' },
  'contactPage.subjectPlaceholder': { en: 'How can we help you?', fr: 'Comment pouvons-nous vous aider ?', ar: 'كيف يمكننا مساعدتك؟' },
  'contactPage.message': { en: 'Message', fr: 'Message', ar: 'الرسالة' },
  'contactPage.messagePlaceholder': { en: 'Tell us more about your inquiry...', fr: 'Parlez-nous de votre demande...', ar: 'أخبرنا المزيد عن استفسارك...' },
  'contactPage.submit': { en: 'Send Message', fr: 'Envoyer le message', ar: 'إرسال الرسالة' },
  'contactPage.successMessage': { en: 'Message sent successfully! We\'ll get back to you soon.', fr: 'Message envoyé avec succès ! Nous vous répondrons bientôt.', ar: 'تم إرسال الرسالة بنجاح! سنرد عليك قريباً.' },
  
  // Features
  'features.title': { en: 'Everything You Need to Manage Queues Efficiently', fr: 'Tout ce dont vous avez besoin pour gérer efficacement les files d\'attente', ar: 'كل ما تحتاجه لإدارة الطوابير بكفاءة' },
  'features.subtitle': { en: 'Powerful features designed to streamline your operations and delight your customers', fr: 'Des fonctionnalités puissantes conçues pour rationaliser vos opérations et ravir vos clients', ar: 'ميزات قوية مصممة لتبسيط عملياتك وإسعاد عملائك' },
  
  // Testimonials
  'testimonials.title': { en: 'Loved by Businesses Everywhere', fr: 'Adoré par les entreprises partout', ar: 'محبوب من قبل الشركات في كل مكان' },
  'testimonials.subtitle': { en: 'See how Toorrii is transforming appointment management across industries', fr: 'Voyez comment Toorrii transforme la gestion des rendez-vous dans tous les secteurs', ar: 'شاهد كيف تحول توريي إدارة المواعيد عبر الصناعات' },
  
  // Integrations
  'integrations.title': { en: 'Seamless Integrations', fr: 'Intégrations transparentes', ar: 'تكاملات سلسة' },
  'integrations.subtitle': { en: 'Connect with the tools you already use. Toorrii integrates with popular platforms to streamline your workflow.', fr: 'Connectez-vous aux outils que vous utilisez déjà. Toorrii s\'intègre aux plateformes populaires pour rationaliser votre flux de travail.', ar: 'اتصل بالأدوات التي تستخدمها بالفعل. يتكامل توريي مع المنصات الشائعة لتبسيط سير عملك.' },
  
  // CTA
  'cta.title': { en: 'Ready to Transform Your Customer Experience?', fr: 'Prêt à transformer votre expérience client ?', ar: 'هل أنت مستعد لتحويل تجربة عملائك؟' },
  'cta.subtitle': { en: 'Start your free trial today and discover how Toorrii can revolutionize your appointment scheduling and queue management.', fr: 'Commencez votre essai gratuit aujourd\'hui et découvrez comment Toorrii peut révolutionner votre planification de rendez-vous et la gestion des files d\'attente.', ar: 'ابدأ تجربتك المجانية اليوم واكتشف كيف يمكن لتوريي أن يحدث ثورة في جدولة المواعيد وإدارة الطوابير.' },
  'cta.button': { en: 'Start Free Trial', fr: 'Commencer l\'essai gratuit', ar: 'ابدأ التجربة المجانية' },
  
  // Partner Detail Page
  'partner.notFound': { en: 'Partner Not Found', fr: 'Partenaire introuvable', ar: 'الشريك غير موجود' },
  'partner.notFoundDesc': { en: 'The partner you\'re looking for doesn\'t exist.', fr: 'Le partenaire que vous recherchez n\'existe pas.', ar: 'الشريك الذي تبحث عنه غير موجود.' },
  'partner.backToPartnerships': { en: 'Back to Partnerships', fr: 'Retour aux partenariats', ar: 'العودة إلى الشراكات' },
  'partner.founded': { en: 'Founded', fr: 'Fondée', ar: 'تأسست' },
  'partner.headquarters': { en: 'Headquarters', fr: 'Siège social', ar: 'المقر الرئيسي' },
  'partner.partnershipSince': { en: 'Partnership Since', fr: 'Partenariat depuis', ar: 'شراكة منذ' },
  'partner.visitWebsite': { en: 'Visit Website', fr: 'Visiter le site', ar: 'زيارة الموقع' },
  'partner.aboutTitle': { en: 'About', fr: 'À propos de', ar: 'عن' },
  'partner.aboutQuote': { en: 'Our partnership with {name} represents a commitment to excellence and innovation in the {industry} sector. Together, we\'re building solutions that transform customer experiences and drive operational efficiency.', fr: 'Notre partenariat avec {name} représente un engagement envers l\'excellence et l\'innovation dans le secteur {industry}. Ensemble, nous construisons des solutions qui transforment les expériences clients et améliorent l\'efficacité opérationnelle.', ar: 'تمثل شراكتنا مع {name} التزاماً بالتميز والابتكار في قطاع {industry}. معاً، نبني حلولاً تحول تجارب العملاء وتدفع الكفاءة التشغيلية.' },
  'partner.collaboration': { en: 'Collaboration', fr: 'Collaboration', ar: 'التعاون' },
  'partner.collaborationDesc': { en: 'Working hand-in-hand to deliver seamless queue management solutions across all touchpoints.', fr: 'Travailler main dans la main pour offrir des solutions de gestion de files d\'attente transparentes à tous les points de contact.', ar: 'العمل يداً بيد لتقديم حلول إدارة طوابير سلسة عبر جميع نقاط الاتصال.' },
  'partner.innovation': { en: 'Innovation', fr: 'Innovation', ar: 'الابتكار' },
  'partner.innovationDesc': { en: 'Continuously evolving our technology stack to meet the dynamic needs of modern service delivery.', fr: 'Évolution continue de notre pile technologique pour répondre aux besoins dynamiques de la prestation de services moderne.', ar: 'تطوير مستمر لمجموعة التقنيات لدينا لتلبية الاحتياجات الديناميكية لتقديم الخدمات الحديثة.' },
  'partner.results': { en: 'Results', fr: 'Résultats', ar: 'النتائج' },
  'partner.resultsDesc': { en: 'Delivering measurable improvements in customer satisfaction, operational efficiency, and service quality.', fr: 'Offrir des améliorations mesurables en matière de satisfaction client, d\'efficacité opérationnelle et de qualité de service.', ar: 'تقديم تحسينات قابلة للقياس في رضا العملاء والكفاءة التشغيلية وجودة الخدمة.' },
  'partner.galleryTitle': { en: 'Partnership in Action', fr: 'Partenariat en action', ar: 'الشراكة في العمل' },
  'partner.gallerySubtitle': { en: 'Visual highlights of our collaboration', fr: 'Points forts visuels de notre collaboration', ar: 'أبرز المعالم المرئية لتعاوننا' },
  'partner.featureHighlight': { en: 'Feature Highlight', fr: 'Point fort', ar: 'ميزة بارزة' },
  'partner.readyToPartner': { en: 'Ready to Partner?', fr: 'Prêt à vous associer ?', ar: 'هل أنت مستعد للشراكة؟' },
  'partner.readyToPartnerDesc': { en: 'Join our network of industry leaders and create value together.', fr: 'Rejoignez notre réseau de leaders de l\'industrie et créez de la valeur ensemble.', ar: 'انضم إلى شبكتنا من قادة الصناعة واخلق القيمة معاً.' },
  'partner.startConversation': { en: 'Start Conversation', fr: 'Commencer la conversation', ar: 'بدء المحادثة' },
  'partner.exploreMore': { en: 'Explore more success stories', fr: 'Explorez plus d\'histoires de réussite', ar: 'استكشف المزيد من قصص النجاح' },
  'partner.viewAllPartners': { en: 'View All Partners', fr: 'Voir tous les partenaires', ar: 'عرض جميع الشركاء' },

  // Footer
  'footer.description': { en: 'Revolutionizing appointment scheduling and queue management for businesses of all sizes.', fr: 'Révolutionner la planification de rendez-vous et la gestion des files d\'attente pour les entreprises de toutes tailles.', ar: 'إحداث ثورة في جدولة المواعيد وإدارة الطوابير للشركات من جميع الأحجام.' },
  'footer.copyright': { en: 'Made with', fr: 'Créé avec', ar: 'صُنع بـ' },
  'footer.allRightsReserved': { en: 'All rights reserved.', fr: 'Tous droits réservés.', ar: 'جميع الحقوق محفوظة.' },
  'footer.product': { en: 'Product', fr: 'Produit', ar: 'المنتج' },
  'footer.company': { en: 'Company', fr: 'Entreprise', ar: 'الشركة' },
  'footer.resources': { en: 'Resources', fr: 'Ressources', ar: 'الموارد' },
  'footer.legal': { en: 'Legal', fr: 'Légal', ar: 'القانونية' },
  'footer.features': { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات' },
  
  // Admin Login
  'admin.login.title': { en: 'Admin Portal', fr: 'Portail Administrateur', ar: 'بوابة الإدارة' },
  'admin.login.subtitle': { en: 'Queue & Reservation Hub', fr: 'Hub de Files & Réservations', ar: 'مركز الطوابير والحجوزات' },
  'admin.login.email': { en: 'Email Address', fr: 'Adresse Email', ar: 'البريد الإلكتروني' },
  'admin.login.emailPlaceholder': { en: 'admin@toorrii.com', fr: 'admin@toorrii.com', ar: 'admin@toorrii.com' },
  'admin.login.password': { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
  'admin.login.forgotPassword': { en: 'Forgot Password?', fr: 'Mot de passe oublié ?', ar: 'نسيت كلمة المرور؟' },
  'admin.login.signIn': { en: 'Sign In to Dashboard', fr: 'Connexion au Tableau de Bord', ar: 'تسجيل الدخول إلى لوحة التحكم' },
  'admin.login.signingIn': { en: 'Signing in...', fr: 'Connexion en cours...', ar: 'جاري تسجيل الدخول...' },
  'admin.login.fillAllFields': { en: 'Please fill in all fields', fr: 'Veuillez remplir tous les champs', ar: 'يرجى ملء جميع الحقول' },
  'admin.login.copyright': { en: 'Toorrii. All rights reserved.', fr: 'Toorrii. Tous droits réservés.', ar: 'توريي. جميع الحقوق محفوظة.' },
  'footer.pricing': { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار' },
  'footer.api': { en: 'API', fr: 'API', ar: 'واجهة برمجة التطبيقات' },
  'footer.integrations': { en: 'Integrations', fr: 'Intégrations', ar: 'التكاملات' },
  'footer.security': { en: 'Security', fr: 'Sécurité', ar: 'الأمان' },
  'footer.about': { en: 'About', fr: 'À propos', ar: 'عن' },
  'footer.blog': { en: 'Blog', fr: 'Blog', ar: 'المدونة' },
  'footer.careers': { en: 'Careers', fr: 'Carrières', ar: 'الوظائف' },
  'footer.press': { en: 'Press', fr: 'Presse', ar: 'الصحافة' },
  'footer.partners': { en: 'Partners', fr: 'Partenaires', ar: 'الشركاء' },
  'footer.documentation': { en: 'Documentation', fr: 'Documentation', ar: 'التوثيق' },
  'footer.helpCenter': { en: 'Help Center', fr: 'Centre d\'aide', ar: 'مركز المساعدة' },
  'footer.community': { en: 'Community', fr: 'Communauté', ar: 'المجتمع' },
  'footer.webinars': { en: 'Webinars', fr: 'Webinaires', ar: 'الندوات عبر الإنترنت' },
  'footer.status': { en: 'Status', fr: 'Statut', ar: 'الحالة' },
  'footer.support': { en: 'Support', fr: 'Support', ar: 'الدعم' },
  'footer.contactUs': { en: 'Contact Us', fr: 'Nous contacter', ar: 'اتصل بنا' },
  'footer.faqs': { en: 'FAQs', fr: 'FAQ', ar: 'الأسئلة الشائعة' },
  'footer.training': { en: 'Training', fr: 'Formation', ar: 'التدريب' },
  'footer.updates': { en: 'Updates', fr: 'Mises à jour', ar: 'التحديثات' },
  'footer.feedback': { en: 'Feedback', fr: 'Commentaires', ar: 'التعليقات' },
  'footer.privacy': { en: 'Privacy', fr: 'Confidentialité', ar: 'الخصوصية' },
  'footer.terms': { en: 'Terms', fr: 'Conditions', ar: 'الشروط' },
  'footer.privacyPolicy': { en: 'Privacy Policy', fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' },
  'footer.termsOfService': { en: 'Terms of Service', fr: 'Conditions d\'utilisation', ar: 'شروط الخدمة' },
  
  // Terms of Service Page
  'terms.title': { en: 'Terms of Service', fr: 'Conditions d\'utilisation', ar: 'شروط الخدمة' },
  'terms.subtitle': { en: 'Please read these terms carefully before using our services', fr: 'Veuillez lire attentivement ces conditions avant d\'utiliser nos services', ar: 'يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا' },
  'terms.lastUpdated': { en: 'Last Updated: November 2025', fr: 'Dernière mise à jour : Novembre 2025', ar: 'آخر تحديث: نوفمبر 2025' },
  
  'terms.introduction.title': { en: 'Introduction', fr: 'Introduction', ar: 'مقدمة' },
  'terms.introduction.content': { en: 'Welcome to Toorrii. These Terms of Service govern your use of our queue management and appointment scheduling platform. By accessing or using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our services.', fr: 'Bienvenue chez Toorrii. Ces conditions d\'utilisation régissent votre utilisation de notre plateforme de gestion des files d\'attente et de planification de rendez-vous. En accédant ou en utilisant nos services, vous acceptez d\'être lié par ces conditions. Si vous n\'acceptez pas une partie de ces conditions, vous ne pouvez pas utiliser nos services.', ar: 'مرحباً بك في توريي. تحكم شروط الخدمة هذه استخدامك لمنصة إدارة الطوابير وجدولة المواعيد الخاصة بنا. باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا.' },
  
  'terms.acceptance.title': { en: 'Acceptance of Terms', fr: 'Acceptation des conditions', ar: 'قبول الشروط' },
  'terms.acceptance.content': { en: 'By creating an account or using Toorrii services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. These terms apply to all users of the service, including but not limited to individual users, organizations, and service providers.\n\nYou must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these terms.', fr: 'En créant un compte ou en utilisant les services Toorrii, vous reconnaissez avoir lu, compris et accepté d\'être lié par ces conditions d\'utilisation et notre politique de confidentialité. Ces conditions s\'appliquent à tous les utilisateurs du service, y compris, mais sans s\'y limiter, les utilisateurs individuels, les organisations et les prestataires de services.\n\nVous devez avoir au moins 18 ans pour utiliser nos services. En utilisant nos services, vous déclarez et garantissez que vous répondez à cette exigence d\'âge et que vous avez la capacité juridique de conclure ces conditions.', ar: 'بإنشاء حساب أو استخدام خدمات توريي، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه وسياسة الخصوصية الخاصة بنا. تنطبق هذه الشروط على جميع مستخدمي الخدمة، بما في ذلك على سبيل المثال لا الحصر المستخدمين الأفراد والمنظمات ومقدمي الخدمات.\n\nيجب أن يكون عمرك 18 عاماً على الأقل لاستخدام خدماتنا. باستخدام خدماتنا، فإنك تقر وتضمن أنك تستوفي متطلبات العمر هذه ولديك الأهلية القانونية للدخول في هذه الشروط.' },
  
  'terms.userRights.title': { en: 'User Rights and Responsibilities', fr: 'Droits et responsabilités des utilisateurs', ar: 'حقوق ومسؤوليات المستخدم' },
  'terms.userRights.content': { en: 'As a user of Toorrii, you have the right to:\n- Access and use our services according to your subscription plan\n- Receive customer support and technical assistance\n- Export your data at any time\n- Request deletion of your account and associated data\n\nYou are responsible for:\n- Maintaining the confidentiality of your account credentials\n- All activities that occur under your account\n- Ensuring the accuracy of information you provide\n- Complying with all applicable laws and regulations\n- Using the service in a manner that does not interfere with others\' use of the platform', fr: 'En tant qu\'utilisateur de Toorrii, vous avez le droit de :\n- Accéder et utiliser nos services selon votre plan d\'abonnement\n- Recevoir un support client et une assistance technique\n- Exporter vos données à tout moment\n- Demander la suppression de votre compte et des données associées\n\nVous êtes responsable de :\n- Maintenir la confidentialité de vos informations d\'identification\n- Toutes les activités qui se produisent sous votre compte\n- Assurer l\'exactitude des informations que vous fournissez\n- Respecter toutes les lois et réglementations applicables\n- Utiliser le service d\'une manière qui n\'interfère pas avec l\'utilisation de la plateforme par les autres', ar: 'كمستخدم لتوريي، لديك الحق في:\n- الوصول إلى خدماتنا واستخدامها وفقاً لخطة اشتراكك\n- تلقي دعم العملاء والمساعدة التقنية\n- تصدير بياناتك في أي وقت\n- طلب حذف حسابك والبيانات المرتبطة به\n\nأنت مسؤول عن:\n- الحفاظ على سرية بيانات اعتماد حسابك\n- جميع الأنشطة التي تحدث تحت حسابك\n- ضمان دقة المعلومات التي تقدمها\n- الامتثال لجميع القوانين واللوائح المعمول بها\n- استخدام الخدمة بطريقة لا تتداخل مع استخدام الآخرين للمنصة' },
  
  'terms.limitations.title': { en: 'Service Limitations and Restrictions', fr: 'Limitations et restrictions du service', ar: 'قيود وقيود الخدمة' },
  'terms.limitations.content': { en: 'You agree not to:\n- Use the service for any unlawful purpose or in violation of any applicable laws\n- Attempt to gain unauthorized access to any part of the service or other systems\n- Interfere with or disrupt the integrity or performance of the service\n- Copy, modify, or distribute any content from the service without permission\n- Use automated systems to access the service in a manner that sends more request messages than a human can reasonably produce\n- Reverse engineer, decompile, or disassemble any aspect of the service\n\nWe reserve the right to suspend or terminate accounts that violate these terms without prior notice.', fr: 'Vous acceptez de ne pas :\n- Utiliser le service à des fins illégales ou en violation de toute loi applicable\n- Tenter d\'obtenir un accès non autorisé à toute partie du service ou d\'autres systèmes\n- Interférer avec ou perturber l\'intégrité ou les performances du service\n- Copier, modifier ou distribuer tout contenu du service sans autorisation\n- Utiliser des systèmes automatisés pour accéder au service d\'une manière qui envoie plus de messages de demande qu\'un humain ne peut raisonnablement produire\n- Rétro-ingénierie, décompiler ou désassembler tout aspect du service\n\nNous nous réservons le droit de suspendre ou de résilier les comptes qui violent ces conditions sans préavis.', ar: 'أنت توافق على عدم:\n- استخدام الخدمة لأي غرض غير قانوني أو مخالف لأي قوانين معمول بها\n- محاولة الوصول غير المصرح به إلى أي جزء من الخدمة أو الأنظمة الأخرى\n- التدخل في أو تعطيل سلامة أو أداء الخدمة\n- نسخ أو تعديل أو توزيع أي محتوى من الخدمة دون إذن\n- استخدام أنظمة آلية للوصول إلى الخدمة بطريقة ترسل رسائل طلب أكثر مما يمكن أن ينتجه الإنسان بشكل معقول\n- الهندسة العكسية أو فك التجميع أو التفكيك لأي جانب من جوانب الخدمة\n\nنحتفظ بالحق في تعليق أو إنهاء الحسابات التي تنتهك هذه الشروط دون إشعار مسبق.' },
  
  'terms.termination.title': { en: 'Account Termination', fr: 'Résiliation du compte', ar: 'إنهاء الحساب' },
  'terms.termination.content': { en: 'Either party may terminate this agreement at any time:\n\nYou may terminate by:\n- Closing your account through the platform settings\n- Contacting our support team to request account closure\n\nWe may terminate or suspend your account if:\n- You breach any provision of these terms\n- We are required to do so by law\n- We discontinue the service (with reasonable notice)\n\nUpon termination:\n- Your right to access and use the service will immediately cease\n- We will retain your data for a period as required by law\n- You may request a final export of your data within 30 days of termination\n- Any outstanding fees remain due and payable', fr: 'L\'une ou l\'autre partie peut résilier cet accord à tout moment :\n\nVous pouvez résilier en :\n- Fermant votre compte via les paramètres de la plateforme\n- Contactant notre équipe de support pour demander la fermeture du compte\n\nNous pouvons résilier ou suspendre votre compte si :\n- Vous violez une disposition de ces conditions\n- Nous sommes tenus de le faire par la loi\n- Nous interrompons le service (avec un préavis raisonnable)\n\nÀ la résiliation :\n- Votre droit d\'accéder et d\'utiliser le service cessera immédiatement\n- Nous conserverons vos données pendant une période requise par la loi\n- Vous pouvez demander une exportation finale de vos données dans les 30 jours suivant la résiliation\n- Tous les frais en suspens restent dus et payables', ar: 'يجوز لأي من الطرفين إنهاء هذه الاتفاقية في أي وقت:\n\nيمكنك الإنهاء عن طريق:\n- إغلاق حسابك من خلال إعدادات المنصة\n- الاتصال بفريق الدعم لدينا لطلب إغلاق الحساب\n\nيجوز لنا إنهاء أو تعليق حسابك إذا:\n- انتهكت أي حكم من هذه الشروط\n- كان مطلوباً منا القيام بذلك بموجب القانون\n- أوقفنا الخدمة (مع إشعار معقول)\n\nعند الإنهاء:\n- سينتهي حقك في الوصول إلى الخدمة واستخدامها على الفور\n- سنحتفظ ببياناتك لفترة يطلبها القانون\n- يمكنك طلب تصدير نهائي لبياناتك في غضون 30 يوماً من الإنهاء\n- تظل أي رسوم مستحقة واجبة الدفع' },
  
  'terms.additional.title': { en: 'Additional Terms', fr: 'Conditions supplémentaires', ar: 'شروط إضافية' },
  'terms.additional.modifications': { en: 'Modifications to Terms', fr: 'Modifications des conditions', ar: 'تعديلات على الشروط' },
  'terms.additional.modificationsContent': { en: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the platform. Your continued use of the service after such modifications constitutes acceptance of the updated terms.', fr: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Nous informerons les utilisateurs des changements importants par e-mail ou via la plateforme. Votre utilisation continue du service après de telles modifications constitue une acceptation des conditions mises à jour.', ar: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنخطر المستخدمين بالتغييرات المهمة عبر البريد الإلكتروني أو من خلال المنصة. يشكل استمرارك في استخدام الخدمة بعد هذه التعديلات قبولاً للشروط المحدثة.' },
  'terms.additional.governing': { en: 'Governing Law', fr: 'Loi applicable', ar: 'القانون الحاكم' },
  'terms.additional.governingContent': { en: 'These terms are governed by and construed in accordance with the laws of Algeria. Any disputes arising from these terms or your use of the service will be subject to the exclusive jurisdiction of the courts of Algeria.', fr: 'Ces conditions sont régies et interprétées conformément aux lois de l\'Algérie. Tout litige découlant de ces conditions ou de votre utilisation du service sera soumis à la juridiction exclusive des tribunaux d\'Algérie.', ar: 'تخضع هذه الشروط وتُفسر وفقاً لقوانين الجزائر. ستخضع أي نزاعات تنشأ عن هذه الشروط أو استخدامك للخدمة للاختصاص الحصري لمحاكم الجزائر.' },
  'terms.additional.contact': { en: 'Contact Information', fr: 'Coordonnées', ar: 'معلومات الاتصال' },
  'terms.additional.contactContent': { en: 'If you have any questions about these Terms of Service, please contact us at contact@toorrii.com or through our support channels.', fr: 'Si vous avez des questions concernant ces conditions d\'utilisation, veuillez nous contacter à contact@toorrii.com ou via nos canaux de support.', ar: 'إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا على contact@toorrii.com أو من خلال قنوات الدعم الخاصة بنا.' },
  
  // About Us Page
  'aboutPage.backToHome': { en: 'Back to Home', fr: 'Retour à l\'accueil', ar: 'العودة إلى الصفحة الرئيسية' },
  'aboutPage.title': { en: 'About Toorriiiii', fr: 'À propos de Toorriiiiiii', ar: 'عن توريي' },
  'aboutPage.intro': { en: 'Toorrii is Algeria\'s leading queue management and appointment scheduling platform, dedicated to transforming how public services, healthcare facilities, and businesses serve their communities. We combine innovative technology with deep understanding of local needs to create efficient, accessible solutions.', fr: 'Toorrii est la principale plateforme de gestion des files d\'attente et de planification de rendez-vous en Algérie, dédiée à transformer la façon dont les services publics, les établissements de santé et les entreprises servent leurs communautés. Nous combinons une technologie innovante avec une compréhension approfondie des besoins locaux pour créer des solutions efficaces et accessibles.', ar: 'توريي هي منصة رائدة في الجزائر لإدارة الطوابير وجدولة المواعيد، مكرسة لتحويل كيفية خدمة الخدمات العامة والمرافق الصحية والشركات لمجتمعاتها. نجمع بين التكنولوجيا المبتكرة والفهم العميق للاحتياجات المحلية لإنشاء حلول فعالة وسهلة الوصول.' },
  'aboutPage.missionTitle': { en: 'Our Mission', fr: 'Notre Mission', ar: 'مهمتنا' },
  'aboutPage.missionText': { en: 'To eliminate waiting times and improve service delivery across Algeria by providing intelligent, user-friendly queue management solutions. We believe everyone deserves efficient access to essential services without the frustration of long queues and uncertain wait times.', fr: 'Éliminer les temps d\'attente et améliorer la prestation de services à travers l\'Algérie en fournissant des solutions de gestion de files d\'attente intelligentes et conviviales. Nous croyons que chacun mérite un accès efficace aux services essentiels sans la frustration des longues files d\'attente et des temps d\'attente incertains.', ar: 'القضاء على أوقات الانتظار وتحسين تقديم الخدمات في جميع أنحاء الجزائر من خلال توفير حلول ذكية وسهلة الاستخدام لإدارة الطوابير. نؤمن بأن الجميع يستحق الوصول الفعال إلى الخدمات الأساسية دون إحباط الطوابير الطويلة وأوقات الانتظار غير المؤكدة.' },
  'aboutPage.visionTitle': { en: 'Our Vision', fr: 'Notre Vision', ar: 'رؤيتنا' },
  'aboutPage.visionText': { en: 'To become the cornerstone of digital transformation in service delivery across North Africa, setting new standards for efficiency, accessibility, and customer satisfaction. We envision a future where waiting in line is a thing of the past, and every interaction with services is seamless and dignified.', fr: 'Devenir la pierre angulaire de la transformation numérique dans la prestation de services en Afrique du Nord, en établissant de nouvelles normes d\'efficacité, d\'accessibilité et de satisfaction client. Nous envisageons un avenir où faire la queue appartient au passé, et où chaque interaction avec les services est fluide et digne.', ar: 'أن نصبح حجر الزاوية في التحول الرقمي لتقديم الخدمات في شمال أفريقيا، ووضع معايير جديدة للكفاءة وسهولة الوصول ورضا العملاء. نتصور مستقبلاً حيث يصبح الانتظار في الطابور شيئاً من الماضي، وكل تفاعل مع الخدمات يكون سلساً وكريماً.' },
  'aboutPage.valuesTitle': { en: 'Our Values', fr: 'Nos Valeurs', ar: 'قيمنا' },
  'aboutPage.innovationTitle': { en: 'Innovation', fr: 'Innovation', ar: 'الابتكار' },
  'aboutPage.innovationText': { en: 'We continuously evolve our technology to meet the changing needs of Algerian institutions and their customers, staying at the forefront of digital service delivery.', fr: 'Nous faisons évoluer continuellement notre technologie pour répondre aux besoins changeants des institutions algériennes et de leurs clients, en restant à l\'avant-garde de la prestation de services numériques.', ar: 'نطور تقنيتنا باستمرار لتلبية الاحتياجات المتغيرة للمؤسسات الجزائرية وعملائها، مع البقاء في طليعة تقديم الخدمات الرقمية.' },
  'aboutPage.accessibilityTitle': { en: 'Accessibility', fr: 'Accessibilité', ar: 'سهولة الوصول' },
  'aboutPage.accessibilityText': { en: 'Our platform is designed to be intuitive and accessible to all users, regardless of their technical expertise, ensuring no one is left behind in the digital transition.', fr: 'Notre plateforme est conçue pour être intuitive et accessible à tous les utilisateurs, quel que soit leur niveau d\'expertise technique, afin que personne ne soit laissé pour compte dans la transition numérique.', ar: 'تم تصميم منصتنا لتكون بديهية ومتاحة لجميع المستخدمين، بغض النظر عن خبرتهم التقنية، لضمان عدم تخلف أحد عن الركب في التحول الرقمي.' },
  'aboutPage.reliabilityTitle': { en: 'Reliability', fr: 'Fiabilité', ar: 'الموثوقية' },
  'aboutPage.reliabilityText': { en: 'We build robust, secure systems that organizations can depend on for their daily operations, maintaining the highest standards of uptime and data protection.', fr: 'Nous construisons des systèmes robustes et sécurisés sur lesquels les organisations peuvent compter pour leurs opérations quotidiennes, en maintenant les normes les plus élevées de disponibilité et de protection des données.', ar: 'نبني أنظمة قوية وآمنة يمكن للمؤسسات الاعتماد عليها في عملياتها اليومية، مع الحفاظ على أعلى معايير وقت التشغيل وحماية البيانات.' },
  'aboutPage.localExpertiseTitle': { en: 'Local Expertise', fr: 'Expertise Locale', ar: 'الخبرة المحلية' },
  'aboutPage.localExpertiseText': { en: 'Understanding the unique challenges and requirements of the Algerian market, we tailor our solutions to meet local needs while maintaining global best practices.', fr: 'Comprenant les défis et exigences uniques du marché algérien, nous adaptons nos solutions pour répondre aux besoins locaux tout en maintenant les meilleures pratiques mondiales.', ar: 'نفهم التحديات والمتطلبات الفريدة للسوق الجزائرية، ونصمم حلولنا لتلبية الاحتياجات المحلية مع الحفاظ على أفضل الممارسات العالمية.' },
  'aboutPage.whoWeServeTitle': { en: 'Who We Serve', fr: 'Qui Nous Servons', ar: 'من نخدم' },
  'aboutPage.whoWeServeText': { en: 'Toorrii partners with a diverse range of institutions across Algeria to modernize their service delivery:', fr: 'Toorrii s\'associe à un large éventail d\'institutions à travers l\'Algérie pour moderniser leur prestation de services :', ar: 'تتشارك توريي مع مجموعة متنوعة من المؤسسات في جميع أنحاء الجزائر لتحديث تقديم خدماتها:' },
  'aboutPage.service1': { en: 'Government agencies and public services', fr: 'Agences gouvernementales et services publics', ar: 'الوكالات الحكومية والخدمات العامة' },
  'aboutPage.service2': { en: 'Healthcare facilities and medical centers', fr: 'Établissements de santé et centres médicaux', ar: 'المرافق الصحية والمراكز الطبية' },
  'aboutPage.service3': { en: 'Banks and financial institutions', fr: 'Banques et institutions financières', ar: 'البنوك والمؤسسات المالية' },
  'aboutPage.service4': { en: 'Telecommunications providers', fr: 'Fournisseurs de télécommunications', ar: 'مقدمو خدمات الاتصالات' },
  'aboutPage.service5': { en: 'Educational institutions', fr: 'Établissements d\'enseignement', ar: 'المؤسسات التعليمية' },
  'aboutPage.service6': { en: 'Retail and commercial establishments', fr: 'Commerces de détail et établissements commerciaux', ar: 'المؤسسات التجارية والتجزئة' },
  'aboutPage.whyChooseTitle': { en: 'Why Choose Toorrii?', fr: 'Pourquoi Choisir Toorrii ?', ar: 'لماذا تختار توريي؟' },
  'aboutPage.provenTrackLabel': { en: 'Proven Track Record:', fr: 'Historique Prouvé :', ar: 'سجل حافل:' },
  'aboutPage.provenTrackText': { en: 'Trusted by leading Algerian institutions including major banks, telecommunications companies, and public services.', fr: 'Fait confiance par les principales institutions algériennes, notamment les grandes banques, les sociétés de télécommunications et les services publics.', ar: 'موثوق به من قبل المؤسسات الجزائرية الرائدة بما في ذلك البنوك الكبرى وشركات الاتصالات والخدمات العامة.' },
  'aboutPage.localSupportLabel': { en: 'Local Support:', fr: 'Support Local :', ar: 'الدعم المحلي:' },
  'aboutPage.localSupportText': { en: 'Dedicated customer support team based in Algeria, understanding your language, culture, and business needs.', fr: 'Équipe de support client dédiée basée en Algérie, comprenant votre langue, votre culture et vos besoins commerciaux.', ar: 'فريق دعم عملاء متخصص مقره في الجزائر، يفهم لغتك وثقافتك واحتياجات عملك.' },
  'aboutPage.complianceLabel': { en: 'Compliance:', fr: 'Conformité :', ar: 'الامتثال:' },
  'aboutPage.complianceText': { en: 'Full compliance with Algerian regulations including Law No. 18-07 on data protection and ANPDP requirements.', fr: 'Conformité totale avec les réglementations algériennes, y compris la loi n° 18-07 sur la protection des données et les exigences de l\'ANPDP.', ar: 'امتثال كامل للوائح الجزائرية بما في ذلك القانون رقم 18-07 بشأن حماية البيانات ومتطلبات ANPDP.' },
  'aboutPage.scalabilityLabel': { en: 'Scalability:', fr: 'Évolutivité :', ar: 'قابلية التوسع:' },
  'aboutPage.scalabilityText': { en: 'Solutions that grow with your organization, from single locations to nationwide networks.', fr: 'Des solutions qui évoluent avec votre organisation, des sites uniques aux réseaux nationaux.', ar: 'حلول تنمو مع مؤسستك، من المواقع الفردية إلى الشبكات على مستوى البلاد.' },
  'aboutPage.getInTouchTitle': { en: 'Get in Touch', fr: 'Contactez-Nous', ar: 'تواصل معنا' },
  'aboutPage.getInTouchText': { en: 'Ready to transform your service delivery? Contact us to learn more about how Toorrii can help your organization.', fr: 'Prêt à transformer votre prestation de services ? Contactez-nous pour en savoir plus sur la façon dont Toorrii peut aider votre organisation.', ar: 'مستعد لتحويل تقديم خدماتك؟ اتصل بنا لمعرفة المزيد حول كيف يمكن لتوريي مساعدة مؤسستك.' },
  'aboutPage.email': { en: 'Email: contact@toorrii.com', fr: 'Email : contact@toorrii.com', ar: 'البريد الإلكتروني: contact@toorrii.com' },
  'aboutPage.phone': { en: 'Phone: +213 (0) XX XX XX XX', fr: 'Téléphone : +213 (0) XX XX XX XX', ar: 'الهاتف: +213 (0) XX XX XX XX' },
  'aboutPage.address': { en: 'Address: [Company Address], Algeria', fr: 'Adresse : [Adresse de l\'entreprise], Algérie', ar: 'العنوان: [عنوان الشركة]، الجزائر' },
  
  // Privacy Policy Page
  'privacyPage.backToHome': { en: 'Back to Home', fr: 'Retour à l\'accueil', ar: 'العودة إلى الصفحة الرئيسية' },
  'privacyPage.title': { en: 'Privacy & Policyyyy', fr: 'Confidentialité et Politique', ar: 'الخصوصية والسياسة' },
  'privacyPage.lastUpdated': { en: 'Last updated:', fr: 'Dernière mise à jour :', ar: 'آخر تحديث:' },
  'privacyPage.intro': { en: 'This Privacy Policy is established in accordance with Algerian Law No. 18-07 on the protection of individuals with regard to the processing of personal data and the regulations of the National Authority for the Protection of Personal Data (ANPDP).', fr: 'Cette politique de confidentialité est établie conformément à la loi algérienne n° 18-07 sur la protection des personnes physiques à l\'égard du traitement des données à caractère personnel et aux réglementations de l\'Autorité Nationale de Protection des Données à Caractère Personnel (ANPDP).', ar: 'تم وضع سياسة الخصوصية هذه وفقًا للقانون الجزائري رقم 18-07 بشأن حماية الأفراد فيما يتعلق بمعالجة البيانات الشخصية ولوائح الهيئة الوطنية لحماية البيانات الشخصية (ANPDP).' },
  'privacyPage.section1Title': { en: '1. Data Controller', fr: '1. Responsable du Traitement', ar: '1. مراقب البيانات' },
  'privacyPage.section1Text': { en: 'Toorrii, registered in Algeria, acts as the data controller for all personal information collected through our queue management and appointment scheduling platform. We are committed to protecting your privacy in compliance with Algerian legislation.', fr: 'Toorrii, enregistré en Algérie, agit en tant que responsable du traitement pour toutes les informations personnelles collectées via notre plateforme de gestion des files d\'attente et de planification de rendez-vous. Nous nous engageons à protéger votre vie privée conformément à la législation algérienne.', ar: 'توريي، المسجلة في الجزائر، تعمل كمراقب للبيانات لجميع المعلومات الشخصية التي تم جمعها من خلال منصة إدارة الطوابير وجدولة المواعيد الخاصة بنا. نحن ملتزمون بحماية خصوصيتك بما يتوافق مع التشريعات الجزائرية.' },
  'privacyPage.section2Title': { en: '2. Legal Basis for Processing', fr: '2. Base Légale du Traitement', ar: '2. الأساس القانوني للمعالجة' },
  'privacyPage.section2Intro': { en: 'We process your personal data based on the following legal grounds as defined by Algerian Law No. 18-07:', fr: 'Nous traitons vos données personnelles sur la base des fondements juridiques suivants définis par la loi algérienne n° 18-07 :', ar: 'نعالج بياناتك الشخصية بناءً على الأسس القانونية التالية كما هو محدد في القانون الجزائري رقم 18-07:' },
  'privacyPage.section2Item1': { en: 'Your explicit consent for specific processing purposes', fr: 'Votre consentement explicite pour des finalités de traitement spécifiques', ar: 'موافقتك الصريحة لأغراض معالجة محددة' },
  'privacyPage.section2Item2': { en: 'Contractual necessity to provide our services', fr: 'Nécessité contractuelle pour fournir nos services', ar: 'الضرورة التعاقدية لتقديم خدماتنا' },
  'privacyPage.section2Item3': { en: 'Compliance with legal obligations under Algerian law', fr: 'Conformité aux obligations légales en vertu de la loi algérienne', ar: 'الامتثال للالتزامات القانونية بموجب القانون الجزائري' },
  'privacyPage.section2Item4': { en: 'Legitimate interests that do not override your fundamental rights', fr: 'Intérêts légitimes qui ne prévalent pas sur vos droits fondamentaux', ar: 'المصالح المشروعة التي لا تتجاوز حقوقك الأساسية' },
  'privacyPage.section3Title': { en: '3. Data Collection and Use', fr: '3. Collecte et Utilisation des Données', ar: '3. جمع واستخدام البيانات' },
  'privacyPage.section3Intro': { en: 'We collect and process only the necessary information required to provide our services:', fr: 'Nous collectons et traitons uniquement les informations nécessaires pour fournir nos services :', ar: 'نجمع ونعالج فقط المعلومات الضرورية المطلوبة لتقديم خدماتنا:' },
  'privacyPage.section3Item1': { en: 'Identity information (name, surname, date of birth)', fr: 'Informations d\'identité (nom, prénom, date de naissance)', ar: 'معلومات الهوية (الاسم، اللقب، تاريخ الميلاد)' },
  'privacyPage.section3Item2': { en: 'Contact details (email address, phone number)', fr: 'Coordonnées (adresse e-mail, numéro de téléphone)', ar: 'تفاصيل الاتصال (عنوان البريد الإلكتروني، رقم الهاتف)' },
  'privacyPage.section3Item3': { en: 'Appointment and queue management data', fr: 'Données de gestion des rendez-vous et des files d\'attente', ar: 'بيانات إدارة المواعيد والطوابير' },
  'privacyPage.section3Item4': { en: 'Technical data for platform optimization', fr: 'Données techniques pour l\'optimisation de la plateforme', ar: 'البيانات التقنية لتحسين المنصة' },
  'privacyPage.section3Text': { en: 'Your data is used exclusively for service delivery, operational purposes, and improvement of our platform\'s functionality.', fr: 'Vos données sont utilisées exclusivement pour la prestation de services, les besoins opérationnels et l\'amélioration des fonctionnalités de notre plateforme.', ar: 'يتم استخدام بياناتك حصريًا لتقديم الخدمات والأغراض التشغيلية وتحسين وظائف منصتنا.' },
  'privacyPage.section4Title': { en: '4. Data Security and Storage', fr: '4. Sécurité et Stockage des Données', ar: '4. أمان وتخزين البيانات' },
  'privacyPage.section4Text': { en: 'We implement robust technical and organizational security measures in accordance with international standards and Algerian requirements. All personal data is encrypted both in transit and at rest. Our systems undergo regular security audits and monitoring to prevent unauthorized access, alteration, or disclosure. Data is stored on secure servers with strict access controls and backup procedures.', fr: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles robustes conformément aux normes internationales et aux exigences algériennes. Toutes les données personnelles sont cryptées en transit et au repos. Nos systèmes font l\'objet d\'audits de sécurité réguliers et d\'une surveillance pour prévenir tout accès, modification ou divulgation non autorisés. Les données sont stockées sur des serveurs sécurisés avec des contrôles d\'accès stricts et des procédures de sauvegarde.', ar: 'نطبق تدابير أمنية تقنية وتنظيمية قوية وفقًا للمعايير الدولية والمتطلبات الجزائرية. يتم تشفير جميع البيانات الشخصية أثناء النقل وفي حالة الراحة. تخضع أنظمتنا لعمليات تدقيق أمنية منتظمة ومراقبة لمنع الوصول غير المصرح به أو التغيير أو الإفصاح. يتم تخزين البيانات على خوادم آمنة مع ضوابط وصول صارمة وإجراءات النسخ الاحتياطي.' },
  'privacyPage.section5Title': { en: '5. Your Rights Under Algerian Law', fr: '5. Vos Droits Selon la Loi Algérienne', ar: '5. حقوقك بموجب القانون الجزائري' },
  'privacyPage.section5Intro': { en: 'In accordance with Law No. 18-07, you have the following rights:', fr: 'Conformément à la loi n° 18-07, vous disposez des droits suivants :', ar: 'وفقًا للقانون رقم 18-07، لديك الحقوق التالية:' },
  'privacyPage.section5Item1': { en: 'Right of access to your personal data', fr: 'Droit d\'accès à vos données personnelles', ar: 'حق الوصول إلى بياناتك الشخصية' },
  'privacyPage.section5Item2': { en: 'Right to rectification of inaccurate or incomplete data', fr: 'Droit de rectification des données inexactes ou incomplètes', ar: 'حق تصحيح البيانات غير الدقيقة أو غير الكاملة' },
  'privacyPage.section5Item3': { en: 'Right to erasure under specific conditions', fr: 'Droit à l\'effacement dans des conditions spécifiques', ar: 'حق المحو في ظروف محددة' },
  'privacyPage.section5Item4': { en: 'Right to restriction of processing', fr: 'Droit à la limitation du traitement', ar: 'حق تقييد المعالجة' },
  'privacyPage.section5Item5': { en: 'Right to data portability', fr: 'Droit à la portabilité des données', ar: 'حق نقل البيانات' },
  'privacyPage.section5Item6': { en: 'Right to object to processing', fr: 'Droit d\'opposition au traitement', ar: 'حق الاعتراض على المعالجة' },
  'privacyPage.section5Item7': { en: 'Right to withdraw consent at any time', fr: 'Droit de retirer votre consentement à tout moment', ar: 'حق سحب الموافقة في أي وقت' },
  'privacyPage.section5Item8': { en: 'Right to lodge a complaint with the ANPDP', fr: 'Droit de déposer une plainte auprès de l\'ANPDP', ar: 'حق تقديم شكوى إلى ANPDP' },
  'privacyPage.section6Title': { en: '6. Data Retention', fr: '6. Conservation des Données', ar: '6. الاحتفاظ بالبيانات' },
  'privacyPage.section6Text': { en: 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by Algerian law. Appointment and queue data are retained for operational purposes and legal compliance. You may request deletion of your data at any time, subject to legal retention requirements.', fr: 'Nous conservons vos données personnelles uniquement le temps nécessaire pour accomplir les finalités pour lesquelles elles ont été collectées, ou comme l\'exige la loi algérienne. Les données de rendez-vous et de file d\'attente sont conservées à des fins opérationnelles et de conformité légale. Vous pouvez demander la suppression de vos données à tout moment, sous réserve des exigences légales de conservation.', ar: 'نحتفظ ببياناتك الشخصية فقط طالما كان ذلك ضروريًا لتحقيق الأغراض التي تم جمعها من أجلها، أو كما يقتضي القانون الجزائري. يتم الاحتفاظ ببيانات المواعيد والطوابير لأغراض تشغيلية والامتثال القانوني. يمكنك طلب حذف بياناتك في أي وقت، مع مراعاة متطلبات الاحتفاظ القانونية.' },
  'privacyPage.section7Title': { en: '7. Third-Party Sharing', fr: '7. Partage avec des Tiers', ar: '7. المشاركة مع أطراف ثالثة' },
  'privacyPage.section7Text': { en: 'We do not sell, trade, or transfer your personal information to third parties without your explicit consent, except as required by Algerian law or to provide our services. Any data shared with service providers is governed by strict confidentiality agreements and complies with Algerian data protection requirements.', fr: 'Nous ne vendons, n\'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement explicite, sauf si la loi algérienne l\'exige ou pour fournir nos services. Toute donnée partagée avec des prestataires de services est régie par des accords de confidentialité stricts et conforme aux exigences algériennes de protection des données.', ar: 'نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف ثالثة دون موافقتك الصريحة، إلا كما يقتضي القانون الجزائري أو لتقديم خدماتنا. يتم تنظيم أي بيانات تتم مشاركتها مع مزودي الخدمة بموجب اتفاقيات سرية صارمة وتتوافق مع متطلبات حماية البيانات الجزائرية.' },
  'privacyPage.section8Title': { en: '8. International Data Transfers', fr: '8. Transferts Internationaux de Données', ar: '8. نقل البيانات الدولي' },
  'privacyPage.section8Text': { en: 'If personal data is transferred outside Algeria, we ensure adequate protection measures are in place as required by Algerian law, including appropriate contractual safeguards and compliance with ANPDP regulations.', fr: 'Si les données personnelles sont transférées hors d\'Algérie, nous nous assurons que des mesures de protection adéquates sont en place conformément à la loi algérienne, y compris des garanties contractuelles appropriées et la conformité aux réglementations de l\'ANPDP.', ar: 'في حالة نقل البيانات الشخصية خارج الجزائر، نضمن وجود تدابير حماية كافية كما يقتضي القانون الجزائري، بما في ذلك الضمانات التعاقدية المناسبة والامتثال للوائح ANPDP.' },
  'privacyPage.section9Title': { en: '9. Cookies and Tracking', fr: '9. Cookies et Suivi', ar: '9. ملفات تعريف الارتباط والتتبع' },
  'privacyPage.section9Text': { en: 'Our platform uses essential cookies for functionality and performance optimization. We obtain your consent before using non-essential cookies. You can manage cookie preferences through your browser settings.', fr: 'Notre plateforme utilise des cookies essentiels pour la fonctionnalité et l\'optimisation des performances. Nous obtenons votre consentement avant d\'utiliser des cookies non essentiels. Vous pouvez gérer les préférences de cookies via les paramètres de votre navigateur.', ar: 'تستخدم منصتنا ملفات تعريف الارتباط الأساسية للوظائف وتحسين الأداء. نحصل على موافقتك قبل استخدام ملفات تعريف الارتباط غير الأساسية. يمكنك إدارة تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.' },
  'privacyPage.section10Title': { en: '10. Updates to This Policy', fr: '10. Mises à Jour de Cette Politique', ar: '10. تحديثات هذه السياسة' },
  'privacyPage.section10Text': { en: 'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes through our platform or via email.', fr: 'Nous pouvons mettre à jour cette politique de confidentialité périodiquement pour refléter les changements dans nos pratiques ou les exigences légales. Nous vous informerons de tout changement important via notre plateforme ou par e-mail.', ar: 'قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية. سنقوم بإعلامك بأي تغييرات جوهرية من خلال منصتنا أو عبر البريد الإلكتروني.' },
  'privacyPage.contactTitle': { en: 'Contact Us', fr: 'Contactez-Nous', ar: 'اتصل بنا' },
  'privacyPage.contactIntro': { en: 'For any questions, concerns, or to exercise your rights under this Privacy Policy, please contact us:', fr: 'Pour toute question, préoccupation ou pour exercer vos droits en vertu de cette politique de confidentialité, veuillez nous contacter :', ar: 'لأي أسئلة أو مخاوف أو لممارسة حقوقك بموجب سياسة الخصوصية هذه، يرجى الاتصال بنا:' },
  'privacyPage.contactEmail': { en: 'Email: privacy@toorrii.com', fr: 'Email : privacy@toorrii.com', ar: 'البريد الإلكتروني: privacy@toorrii.com' },
  'privacyPage.contactPhone': { en: 'Phone: +213 (0) XX XX XX XX', fr: 'Téléphone : +213 (0) XX XX XX XX', ar: 'الهاتف: +213 (0) XX XX XX XX' },
  'privacyPage.contactAddress': { en: 'Address: [Company Address], Algeria', fr: 'Adresse : [Adresse de l\'entreprise], Algérie', ar: 'العنوان: [عنوان الشركة]، الجزائر' },
  'privacyPage.contactOutro': { en: 'You may also contact the National Authority for the Protection of Personal Data (ANPDP) if you have concerns about how we handle your personal information.', fr: 'Vous pouvez également contacter l\'Autorité Nationale de Protection des Données à Caractère Personnel (ANPDP) si vous avez des préoccupations concernant la façon dont nous traitons vos informations personnelles.', ar: 'يمكنك أيضًا الاتصال بالهيئة الوطنية لحماية البيانات الشخصية (ANPDP) إذا كانت لديك مخاوف بشأن كيفية تعاملنا مع معلوماتك الشخصية.' },
};

// Define the shape of the context value.
interface TranslationContextType {
  language: 'en' | 'fr' | 'ar';
  setLanguage: (lang: 'en' | 'fr' | 'ar') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create a React context to provide translation-related values to the component tree.
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Define the props for the TranslationProvider component.
interface TranslationProviderProps {
  children: ReactNode;
}

/**
 * Provides translation context to the application.
 * This component wraps the application and makes translation functions and state available to all components.
 */
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // State to hold the current language, defaulting to 'fr'.
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('fr');

  /**
   * Retrieves a translation for a given key in the current language.
   * @param key The key of the translation string.
   * @returns The translated string or the key itself if not found.
   */
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  // Determine if the current language is Right-to-Left (RTL).
  const isRTL = language === 'ar';

  // Effect to update the document's direction and language attributes when the language changes.
  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  // Provide the translation context to child components.
  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
};

/**
 * Custom hook to access the translation context.
 * This hook provides a convenient way for components to get the current language, change the language, and translate text.
 * @returns The translation context.
 * @throws An error if used outside of a TranslationProvider.
 */
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
