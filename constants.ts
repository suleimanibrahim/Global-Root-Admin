import { Community, CommunityRequest, CommunityStatus, MemberRequest, User } from "./types";

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Admin User',
  email: 'admin@communityhq.com',
  role: 'Community Operations',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXbmYGF5qkSsm4rMBLPRiRyhySgoRbkdsaFkg_PBWOss7cP4OBvH1OkWb2WUDGtq_aLzXYothCjb15sFlBGcD5od5oFckxBtrCFBXDl1ytn62cB5cxtVr3veDUb9YP0FjuAfqb54kXVo_g5R9nRCuFbVbjEU8-3f7VkvPjghLkyv8UtSarAoWdYSbbGd_WdwUartA0tZLTGbiTN956tE45ZyKNf1A1Fx-Eg6MBp8jwuAEmpl9ckVcSonldpFX1HWrTffZz2L5yx_g0'
};

export const MOCK_COMMUNITIES: Community[] = [
  { id: 'c1', name: 'Design Enthusiasts', creationDate: 'Oct 26, 2023', membersCount: 1250, status: CommunityStatus.Active },
  { id: 'c2', name: 'Product Feedback Group', creationDate: 'Sep 15, 2023', membersCount: 842, status: CommunityStatus.Active },
  { id: 'c3', name: 'Beta Testers United', creationDate: 'Aug 01, 2023', membersCount: 450, status: CommunityStatus.Archived },
  { id: 'c4', name: 'Early Adopters Club', creationDate: 'Jul 22, 2023', membersCount: 2100, status: CommunityStatus.Active },
  { id: 'c5', name: 'Marketing Gurus', creationDate: 'Jun 10, 2023', membersCount: 3200, status: CommunityStatus.Active },
  { id: 'c6', name: 'Startup Founders Hub', creationDate: 'May 05, 2023', membersCount: 890, status: CommunityStatus.Active },
  { id: 'c7', name: 'Photography Lovers', creationDate: 'Apr 12, 2023', membersCount: 560, status: CommunityStatus.Archived },
];

export const MOCK_COMMUNITY_REQUESTS: CommunityRequest[] = [
  { 
    id: 'cr1', 
    name: "Creative Coders", 
    requesterName: 'Alex Johnson', 
    requesterEmail: 'alex.j@example.com',
    requesterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrTdjWiC8DRNg3ITgAq5O4HMwOud-OsLHA5mww4-hVyOXI4xwOilMiLl54yGi3uz4cMc2XwNqgK-3bqdnmOWarQ1sDBQKNckCPCGSvm_AtGRj85RLCZVwF762nsTlb_3cBo_uygtYZX4L-PuemfYe8sRR04GRNpkWKQrRo-U_HgKIc4IUJ2Hx2LtHkXZlEqkpYNO10RRgtnVP3-sDJcYTp8ebn2kTzEnSt9yhYcWhEGCVxmfWm7S4VX3kVmeZwiiY_k_vvpf_1EBXY',
    submissionDate: '2023-10-26',
    timeAgo: '2 hours ago'
  },
  { 
    id: 'cr2', 
    name: "UX Wanderers", 
    requesterName: 'Samantha Bee', 
    requesterEmail: 'sam.bee@example.com',
    requesterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHXk5hDPhLX4cmgWkB92liBkwz846HhJsztjmSCDxtyn4Uu1VjQtqa67M1-tFJqHuqArRTw1WJ4q8Axjmw3geyAeklUZBgauDcWN8pOUOey77ZE12sY1_hk6bSdZ3oc3fu-UKpSBSAIghQWoX9NYd2Id25RNnGerV_06LTEXM9oqC8mcdmPV4dETyZLWSorIjFYgE9w5ROTwEsDuDw5v-5hJgIaBdZmqP5e9OMU5GDnhA0fjS-oaXLLSI80W2f0K5rSpkHbdDPBPXC',
    submissionDate: '2023-10-25',
    timeAgo: '1 day ago'
  },
  { 
    id: 'cr3', 
    name: "Data Viz Wizards", 
    requesterName: 'Mike Stan', 
    requesterEmail: 'mike.s@example.com',
    requesterAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0up0uBe-wn5puwCm8niESeDk7tfefodoQJT642vCCxZKyUyyjmVjNVlSI4fv9UlCsNvw1y2pkxDPQiT_BWUMH9gpvZ_NiIs02LgvXY9DGwfPRoRO55bdS8kNYjNE1DoxZ6nN7YMClUSLAYyY6TSj29P-Qw59QgcyHjhQd6eReS1clpDVpWnzxkWOZM78rFPJIRb86OWs08qDosKLdf27k_pcCj2r-gwXWm_PZwm5F4wtOEDlbYjCIpQCTTGa03l82XBuRhDmiMy58',
    submissionDate: '2023-10-24',
    timeAgo: '3 days ago'
  },
];

export const MOCK_MEMBER_REQUESTS: MemberRequest[] = [
  {
    id: 'mr1',
    userId: 'u2',
    userName: 'Jane Doe',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2doDbvuFUgmjsIqh4ic02IDlhib39VYe0pAapD7ISPPxzf65zXYFXU_sN8L08hAL30RBX3Aj4X23BEWG9F2zi4dJN9aK5INEXUYumUiPhWGDPufxVOTVufLgT6VngYcLSk48BsT4Pqy_ZKrtCx4hhR0CQlJAnbzvdVGmKaoCSsLqcGVleSY8VlrRAbJJNVnKxgIobVQKlS96UG36RnhQ-_qlm6LCCt7CC9XbFKim68VP6P8XbLQbXxRbuika3WWZ57SXtpxi1JKwZ',
    communityName: 'Tech Innovators',
    submissionDate: '2023-10-26',
    timeAgo: '5 minutes ago'
  },
  {
    id: 'mr2',
    userId: 'u3',
    userName: 'Carlos Rex',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv2BLAl1ebPrUHvxLaDHol54TLfuij8tmCONJsFeWYUwrFE_ex0OowmccxYUbnwUSx169EhBvMoGWCL8rp6QxFIIWoEq-Dfz7o1kBltJbuHYIoQApeIwchpVyxv6hw8tQum1ymEXZUhGUPK9F7MmBPHawXUpEwjlTPu8pvjGQgX8ILY19LsIu4DQbaT5QusKo4wM-bF1sPXeTBIg2OXVHBjFL3N6WZNdFNRP3e4SkVpR_Ti30qiNOF0HT3EEW5QV8gyXTfo7Yxu8z4',
    communityName: 'Early Adopters Club',
    submissionDate: '2023-10-26',
    timeAgo: '45 minutes ago'
  },
  {
    id: 'mr3',
    userId: 'u4',
    userName: 'Maria Garcia',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJ8rkyYknBHgfP9e12PtUwMd3zUGnE3B0dhYVYQ8TDgpmrDryl-gn3_dsJeZ3SszjONKk_6ljjWl19DMdKQ8wuNgvrreBwZS2-T7EJhVQ0Qbf832i_19jzqQagx_dBEEANwZbkZzGFhy5wsU34ze8sPDyQvVaVp09EH89R8KeWx3vkMD4sz6S5aYHNLR0LWeM6KpW8DFmWCtIP_rUEcKcffG78k0G7YO8p282veevTSfinpiclt-ARXxi2jpLz4batMeSboGL-QAp',
    communityName: 'Design Enthusiasts',
    submissionDate: '2023-10-24',
    timeAgo: '2 days ago'
  }
];
