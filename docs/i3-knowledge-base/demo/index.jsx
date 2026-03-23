import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ─── Data Layer ──────────────────────────────────────────────────────────────
const PRODUCT_TREE = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: null,
    children: [
      { id: "gs-overview", label: "Overview", content: "gs-overview" },
      { id: "gs-system-req", label: "System Requirements", content: "gs-system-req" },
    ],
  },
  {
    id: "srx-pro-mobile",
    label: "SRX-Pro Mobile App",
    icon: null,
    children: [
      { id: "mob-overview", label: "Overview", content: "mob-overview" },
      {
        id: "mob-install",
        label: "Installation",
        children: [
          { id: "mob-install-ios", label: "iOS", content: "mob-install-ios" },
          { id: "mob-install-android", label: "Android", content: "mob-install-android" },
          { id: "mob-install-bb", label: "BlackBerry", content: "mob-install-bb" },
        ],
      },
      {
        id: "mob-connections",
        label: "Remote Connections",
        children: [
          { id: "mob-add-connection", label: "Add a Connection", content: "mob-add-connection" },
          { id: "mob-edit-connection", label: "Edit a Connection", content: "mob-edit-connection" },
          { id: "mob-delete-connection", label: "Delete a Connection", content: "mob-delete-connection" },
          { id: "mob-server-groups", label: "Server Groups", content: "mob-server-groups" },
        ],
      },
      {
        id: "mob-live-view",
        label: "Live Viewing",
        children: [
          { id: "mob-connect-server", label: "Connect to a Server", content: "mob-connect-server" },
          { id: "mob-screen-layout", label: "Screen Layout & Navigation", content: "mob-screen-layout" },
          { id: "mob-channel-mapping", label: "Channel Mapping", content: "mob-channel-mapping" },
          { id: "mob-disconnect", label: "Disconnect & Exit", content: "mob-disconnect" },
        ],
      },
      {
        id: "mob-settings",
        label: "Settings",
        children: [
          { id: "mob-video-settings", label: "Video Quality & Frame Rate", content: "mob-video-settings" },
          { id: "mob-ratio-view", label: "Ratio View", content: "mob-ratio-view" },
          { id: "mob-alarm-settings", label: "Alarm Settings", content: "mob-alarm-settings" },
        ],
      },
      {
        id: "mob-features",
        label: "Features",
        children: [
          { id: "mob-ptz", label: "PTZ Camera Control", content: "mob-ptz" },
          { id: "mob-snapshot", label: "Taking Snapshots", content: "mob-snapshot" },
          { id: "mob-alarm-logs", label: "Searching Alarm Logs", content: "mob-alarm-logs" },
        ],
      },
      { id: "mob-hotkeys", label: "Keyboard Shortcuts", content: "mob-hotkeys" },
      { id: "mob-troubleshoot", label: "Troubleshooting", content: "mob-troubleshoot" },
    ],
  },
  {
    id: "srx-pro-manuals",
    label: "SRX-Pro Server",
    icon: null,
    children: [
      { id: "srx-overview", label: "Product Overview", content: "srx-overview" },
      { id: "srx-server-info", label: "Server Info Setup", content: "srx-server-info" },
      { id: "srx-user-mgmt", label: "User Management", content: "srx-user-mgmt" },
    ],
  },
  {
    id: "vpc",
    label: "Video Pilot Client (VPC)",
    icon: null,
    children: [
      { id: "vpc-overview", label: "Overview", content: "vpc-overview" },
      { id: "vpc-getting-started", label: "Getting Started", children: [
        { id: "vpc-launch", label: "Launch & Login", content: "vpc-launch" },
        { id: "vpc-ui", label: "Navigating the Interface", content: "vpc-ui" },
        { id: "vpc-screen-div", label: "Screen Divisions", content: "vpc-screen-div" },
      ]},
      { id: "vpc-servers", label: "Server Connections", children: [
        { id: "vpc-add-server", label: "Add a Server", content: "vpc-add-server" },
        { id: "vpc-add-i3host", label: "Connect via i3Host", content: "vpc-add-i3host" },
        { id: "vpc-add-cms", label: "Connect via CMS", content: "vpc-add-cms" },
        { id: "vpc-server-groups", label: "Server Groups", content: "vpc-server-groups" },
        { id: "vpc-disconnect", label: "Disconnect", content: "vpc-disconnect" },
      ]},
      { id: "vpc-cameras", label: "Camera Management", children: [
        { id: "vpc-cam-connect", label: "Connect to Cameras", content: "vpc-cam-connect" },
        { id: "vpc-favorites", label: "Favorites", content: "vpc-favorites" },
        { id: "vpc-color-tags", label: "Color Tags", content: "vpc-color-tags" },
        { id: "vpc-maps", label: "Maps & Linked Cameras", content: "vpc-maps" },
      ]},
      { id: "vpc-live", label: "Live Viewing", children: [
        { id: "vpc-live-controls", label: "On-Screen Controls", content: "vpc-live-controls" },
        { id: "vpc-ptz", label: "PTZ & Fisheye Control", content: "vpc-ptz" },
        { id: "vpc-quick-search", label: "Quick Search", content: "vpc-quick-search" },
      ]},
      { id: "vpc-search", label: "Video Search", children: [
        { id: "vpc-calendar-search", label: "Calendar Search", content: "vpc-calendar-search" },
        { id: "vpc-advanced-search", label: "Advanced Search", content: "vpc-advanced-search" },
      ]},
      { id: "vpc-backup", label: "Video Backup", children: [
        { id: "vpc-backup-create", label: "Create a Backup", content: "vpc-backup-create" },
        { id: "vpc-backup-formats", label: "Backup Formats", content: "vpc-backup-formats" },
      ]},
      { id: "vpc-player", label: "VPC Player", children: [
        { id: "vpc-player-overview", label: "Overview", content: "vpc-player-overview" },
        { id: "vpc-player-playback", label: "Playback Controls", content: "vpc-player-playback" },
      ]},
    ],
  },
  {
    id: "api-ref",
    label: "API Reference",
    icon: null,
    children: [
      { id: "api-auth", label: "Authentication", content: "api-auth" },
      { id: "api-endpoints", label: "Endpoints", content: "api-endpoints" },
      { id: "api-webhooks", label: "Webhooks", content: "api-webhooks" },
    ],
  },
];

const CONTENT = {
  "gs-overview": {
    title: "Overview",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["getting-started"],
    body: [
      { type: "intro", text: "Welcome to the i3 International product documentation. This knowledge base provides comprehensive guides, configuration references, and troubleshooting resources for the i3 product ecosystem." },
      { type: "callout", variant: "tip", title: "New to i3?", text: "Start with the SRX-Pro Mobile App section to learn how to connect to your SRX-Pro server remotely from your mobile device." },
      { type: "heading", text: "Documentation Sections" },
      {
        type: "grid",
        items: [
          { icon: null, title: "SRX-Pro Mobile App", desc: "Install, configure, and use the SRX-Pro Mobile Remote app on iOS, Android, or BlackBerry devices." },
          { icon: null, title: "SRX-Pro Server", desc: "Server setup, configuration, user management, and recording system administration." },
          { icon: null, title: "API Reference", desc: "Integration endpoints, authentication, and webhook configuration." },
        ],
      },
      { type: "heading", text: "Documentation Conventions" },
      { type: "callout", variant: "info", title: "Information", text: "Provides additional context or background that may be helpful but isn't required to complete the task." },
      { type: "callout", variant: "warning", title: "Warning", text: "Highlights actions that could cause data loss, service interruption, or security issues if not followed carefully." },
      { type: "callout", variant: "tip", title: "Tip", text: "Suggests best practices, shortcuts, or alternative approaches." },
    ],
  },
  "gs-system-req": {
    title: "System Requirements",
    updated: "2026-01-20",
    readTime: "2 min",
    tags: ["requirements", "hardware"],
    body: [
      { type: "intro", text: "Before installing the SRX-Pro Mobile Remote app, verify your device meets the minimum requirements." },
      { type: "heading", text: "Mobile Device Requirements" },
      {
        type: "table",
        headers: ["Platform", "Minimum OS Version", "App Source"],
        rows: [
          ["iOS", "iOS 6.0 or later", "Apple App Store — search \"srx\""],
          ["Android", "Android 2.3 or later", "Google Play Store — search \"srx pro\""],
          ["BlackBerry", "BlackBerry OS 5.0 or later", "BlackBerry App World — search \"SRX\""],
        ],
      },
      { type: "heading", text: "Network Requirements" },
      {
        type: "list",
        items: [
          "Wi-Fi or cellular data connection",
          "Access to the remote SRX-Pro Server's IP address and port (default: 13225)",
          "Valid Server ID, username, and password configured on the SRX-Pro Server",
        ],
      },
      { type: "callout", variant: "warning", title: "Data Usage", text: "Video streaming over cellular data can result in significant data charges, especially when roaming. Always use Wi-Fi when available. The only way to completely stop data streaming is to exit the app entirely." },
    ],
  },
  "mob-overview": {
    title: "SRX-Pro Mobile App — Overview",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["srx-pro", "mobile", "remote"],
    body: [
      { type: "intro", text: "The SRX-Pro Mobile Remote app allows you to connect to your SRX-Pro surveillance servers from iOS, Android, or BlackBerry devices. View live camera feeds, control PTZ cameras, take snapshots, and review alarm logs — all remotely from your mobile device." },
      { type: "heading", text: "Key Features" },
      {
        type: "list",
        items: [
          "Live video viewing with configurable screen divisions (1, 4, 9, 16, 25, or 36 channels)",
          "Connect to multiple SRX-Pro servers and switch between them",
          "PTZ camera pan, tilt, and zoom control",
          "Snapshot capture — save to device or send via email",
          "Alarm log search with event type filtering (motion, sensor, video loss, stop recording)",
          "Adjustable video quality (10%–100%) and frame rate (1–30 fps)",
          "Channel mapping for custom display layouts",
          "Server grouping for organizing multiple remote connections",
        ],
      },
      { type: "heading", text: "Supported Platforms" },
      {
        type: "table",
        headers: ["Platform", "Version", "Status"],
        rows: [
          ["iOS", "iOS App", "Available on Apple App Store"],
          ["Android", "Android App", "Available on Google Play Store"],
          ["BlackBerry", "BlackBerry OS App", "Available on BlackBerry App World"],
        ],
      },
      { type: "heading", text: "Connection Requirements" },
      { type: "paragraph", text: "To connect to a remote SRX-Pro server, you need the server's IP address (static or DDNS), port number (default 13225), Server ID, and valid user credentials. All of these are configured in the Server Info Setup and User Management tabs on the SRX-Pro Server." },
      { type: "callout", variant: "info", title: "Authentication", text: "The system validates Server ID, Server IP, username, and password together. If any of these values are incorrect, the connection will fail." },
    ],
  },
  "mob-install-ios": {
    title: "Install on iOS",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["installation", "ios", "mobile"],
    body: [
      { type: "intro", text: "Download and install the SRX-Pro Mobile Remote app on your iPhone or iPad from the Apple App Store." },
      { type: "callout", variant: "tip", title: "Wi-Fi Recommended", text: "If available, switch your iOS device to Wi-Fi before using the app to minimize charges to your cellular data plan." },
      { type: "heading", text: "Installation Steps" },
      {
        type: "steps",
        items: [
          "Open the Apple App Store on your iOS device.",
          "Search for \"srx\" in the search bar.",
          "Locate SRX-Pro by i3 International Inc. in the results and tap Install.",
          "Enter your Apple ID password when prompted and tap OK to begin the download.",
          "Wait for the app to download and install.",
          "Locate the SRX-Pro icon on your home screen and tap to launch.",
          "A data usage warning will appear. Tap OK to dismiss and proceed.",
          "The Connect window will appear — you're ready to add your first remote connection.",
        ],
      },
      { type: "heading", text: "What's Next" },
      { type: "paragraph", text: "After installation, proceed to Add a Connection to configure your first remote SRX-Pro server." },
    ],
  },
  "mob-install-android": {
    title: "Install on Android",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["installation", "android", "mobile"],
    body: [
      { type: "intro", text: "Download and install the SRX-Pro Mobile Remote app on your Android device from the Google Play Store." },
      { type: "heading", text: "Installation Steps" },
      {
        type: "steps",
        items: [
          "Open the Google Play Store on your Android device.",
          "Search for \"srx pro\" in the search bar.",
          "Select SRX-Pro Mobile Remote from the results.",
          "Tap Install, then tap Accept & download to accept permission requirements.",
          "Wait for the app to download and install.",
          "Locate the SRX-Pro icon in your app menu and tap to launch.",
          "The SRX-Pro Mobile Remote startup screen will appear.",
        ],
      },
      { type: "heading", text: "What's Next" },
      { type: "paragraph", text: "After installation, proceed to Add a Connection to configure your first remote SRX-Pro server." },
    ],
  },
  "mob-install-bb": {
    title: "Install on BlackBerry",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["installation", "blackberry", "mobile"],
    body: [
      { type: "intro", text: "Download and install the SRX-Pro Mobile Remote app on your BlackBerry device from BlackBerry App World." },
      { type: "callout", variant: "info", title: "Compatibility", text: "SRX-Pro Mobile Remote App requires BlackBerry OS 5.0 or higher." },
      { type: "heading", text: "Installation Steps" },
      {
        type: "steps",
        items: [
          "Open BlackBerry App World on your device.",
          "Search for \"SRX\" to locate the app.",
          "Click the Download link to begin installation.",
          "Once downloaded, locate the SRX-Pro icon in your device menu and launch the app.",
          "The SRX-Pro Mobile Remote startup screen will appear.",
        ],
      },
      { type: "heading", text: "What's Next" },
      { type: "paragraph", text: "After installation, proceed to Add a Connection to configure your first remote SRX-Pro server." },
    ],
  },
  "mob-add-connection": {
    title: "Add a Remote Connection",
    updated: "2026-03-10",
    readTime: "4 min",
    tags: ["connection", "setup", "server"],
    body: [
      { type: "intro", text: "Before you can view live video, you need to add one or more remote SRX-Pro server connections to the app. Each connection requires the server's network address, Server ID, and valid user credentials." },
      { type: "heading", text: "Prerequisites" },
      {
        type: "list",
        items: [
          "SRX-Pro Mobile Remote app installed on your device",
          "Server IP address (static or DDNS) — obtain from Server Info Setup tab on SRX-Pro Server",
          "Server Port (default: 13225)",
          "Server ID — must match the Server ID on the SRX-Pro Server",
          "Username and password — must match credentials in User Management Setup on SRX-Pro Server",
        ],
      },
      { type: "heading", text: "Steps" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Launch the app. The Connect window appears by default.",
            "Tap All Servers.",
            "Tap Add in the Connect - All Servers window.",
            "In the Add New window, fill in each field: Server Name (descriptive label), Server Address (IP or DDNS), Server Port (default 13225), Server ID, Username, and Password.",
            "Tap Save. The new connection appears in the list.",
            "Repeat to add additional servers.",
          ],
          Android: [
            "Launch the app, then press the Menu button on your device.",
            "Tap Connect.",
            "In the Choose Server window, tap Add New Server.",
            "In the Add Server window, fill in: Server Name, Server Address, Server Port (default 13225), Server ID, Username, and Password.",
            "Tap Save, then tap Yes to confirm.",
            "Repeat to add additional servers.",
          ],
          BlackBerry: [
            "Launch the app, then press the trackpad or Menu key.",
            "Select Connect.",
            "In the Choose Server window, press trackpad/Menu and select New.",
            "In the Add Server window, fill in: Server Name, Server Address, Server Port (default 13225), Server ID, Username, and Password.",
            "Click Save, then click Yes to confirm.",
            "Repeat to add additional servers.",
          ],
        },
      },
      { type: "heading", text: "Connection Fields Reference" },
      {
        type: "table",
        headers: ["Field", "Description", "Where to Find"],
        rows: [
          ["Server Name", "A descriptive label for the connection (e.g. \"Office\", \"Warehouse\")", "Your choice — for identification only"],
          ["Server Address", "IP address or DDNS hostname of the SRX-Pro Server", "Server Info Setup tab on SRX-Pro Server"],
          ["Server Port", "Network port for remote connections (default: 13225)", "Contact your IT specialist if non-default"],
          ["Server ID", "Unique identifier matching the SRX-Pro Server configuration", "Server Info Setup tab on SRX-Pro Server"],
          ["Username", "Login username for the remote connection", "User Management Setup tab on SRX-Pro Server"],
          ["Password", "Login password for the remote connection", "User Management Setup tab on SRX-Pro Server"],
        ],
      },
      { type: "callout", variant: "warning", title: "Authentication Validation", text: "The system validates Server ID, Server IP, username, and password together. If any single value is incorrect, the connection will be refused." },
    ],
  },
  "mob-edit-connection": {
    title: "Edit a Remote Connection",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["connection", "edit", "server"],
    body: [
      { type: "intro", text: "When your SRX-Pro Server settings change — such as an IP address update, password change, or Server ID modification — you must update the corresponding connection in the mobile app. Without updating, you'll be unable to connect and will receive an error." },
      { type: "heading", text: "Steps" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Launch the app. Tap All Servers (or the relevant Group).",
            "Tap Edit in the upper corner.",
            "Tap the Settings icon next to the connection you want to modify.",
            "Tap Server Info.",
            "Update the changed fields (Server Name, Address, Port, ID, Username, or Password).",
            "Tap Save to apply changes.",
            "Tap Done to commit all changes.",
          ],
          Android: [
            "Launch the app, press Menu, then tap Connect.",
            "In the Choose Server list, touch and hold the connection to edit until the context menu appears.",
            "Tap Edit.",
            "Update the changed fields in the Edit Server window.",
            "Tap Save, then tap Yes to confirm.",
          ],
          BlackBerry: [
            "Launch the app, press trackpad/Menu key, select Connect.",
            "In the Choose Server window, select the connection, then press trackpad/Menu.",
            "Select Edit.",
            "Update the changed fields in the Edit Server window.",
            "Click Save, then click Yes to confirm.",
          ],
        },
      },
    ],
  },
  "mob-delete-connection": {
    title: "Delete a Remote Connection",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["connection", "delete", "server"],
    body: [
      { type: "intro", text: "Remove a stored remote server connection when it's no longer needed." },
      { type: "heading", text: "Steps" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Launch the app. Tap All Servers (or the relevant Group).",
            "Tap Edit.",
            "Tap the Settings icon next to the connection.",
            "Tap Delete.",
          ],
          Android: [
            "Launch the app, press Menu, then tap Connect.",
            "Touch and hold the connection until the context menu appears.",
            "Tap Delete, then tap Yes to confirm.",
          ],
          BlackBerry: [
            "Launch the app, press trackpad/Menu, select Connect.",
            "Select the connection, press trackpad/Menu, select Delete.",
            "Click Yes to confirm.",
          ],
        },
      },
    ],
  },
  "mob-server-groups": {
    title: "Organize Connections into Groups",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["groups", "organization", "ios"],
    body: [
      { type: "intro", text: "On iOS, you can organize your remote connections into named groups for easier management when working with multiple servers. On Android and BlackBerry, connections can be reordered in the list." },
      { type: "heading", text: "Create a Server Group (iOS)" },
      {
        type: "steps",
        items: [
          "Launch the app. The Connect window shows your groups.",
          "Tap Add.",
          "Type the group name and tap Done.",
          "Tap All Servers to find the connection you want to assign.",
          "Tap Edit, then tap the Settings icon next to the connection.",
          "Inside Edit Server, tap Add to group.",
          "Select the target group. Tap Save.",
          "Tap Done to save. Verify by navigating to the group.",
        ],
      },
      { type: "heading", text: "Rename or Delete a Group (iOS)" },
      { type: "paragraph", text: "Deleting a group moves all connections back into \"All Servers\" — it does not delete the connections themselves." },
      {
        type: "steps",
        items: [
          "In the Connect window, tap Edit.",
          "Tap Text to rename the group, or tap Delete to remove it.",
          "Confirm your action.",
        ],
      },
      { type: "heading", text: "Reorder Connections (Android / BlackBerry)" },
      { type: "paragraph", text: "On Android and BlackBerry, touch and hold a connection in the Choose Server list, then select Up or Down from the context menu to reorder." },
    ],
  },
  "mob-connect-server": {
    title: "Connect to a Remote Server",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["connect", "live", "viewing"],
    body: [
      { type: "intro", text: "Once you've added a remote connection, you can connect to it to begin viewing live camera feeds." },
      { type: "heading", text: "Steps" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Launch the app. Tap All Servers or the relevant Group.",
            "Tap the server connection you want to connect to.",
            "The split-screen view with available camera channels loads.",
          ],
          Android: [
            "Launch the app, press Menu, tap Connect.",
            "Touch and hold the server in the Choose Server list.",
            "Tap Connect in the context menu.",
            "The split-screen view with available camera channels loads.",
          ],
          BlackBerry: [
            "Launch the app, press Menu, select Connect.",
            "Select the server, press trackpad/Menu.",
            "Select Connect from the menu.",
            "The split-screen view with available channels loads.",
          ],
        },
      },
      { type: "heading", text: "Switch to a Different Server" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "While connected, tap the Home icon.",
            "The server list appears. Tap a different server to connect.",
            "The app disconnects from the current server and connects to the new one.",
          ],
          Android: [
            "While connected, press Menu and tap Connect.",
            "Touch and hold a different server and tap Connect.",
            "Tap Yes in the disconnect confirmation to switch.",
          ],
          BlackBerry: [
            "While connected, press Menu and select Connect.",
            "Select a different server, press trackpad/Menu, select Connect.",
            "Select Yes to disconnect and switch.",
          ],
        },
      },
      { type: "callout", variant: "warning", title: "Connection Errors", text: "If the connection fails, verify that Server ID, Server IP, username, and password all match the SRX-Pro Server configuration. All four values are validated together." },
    ],
  },
  "mob-screen-layout": {
    title: "Screen Layout & Navigation",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["layout", "screen", "navigation"],
    body: [
      { type: "intro", text: "Once connected, camera feeds display in a split-screen grid. You can navigate between channels, switch to full screen, and change the number of visible channels." },
      { type: "heading", text: "Navigating Channels" },
      {
        type: "table",
        headers: ["Action", "iOS", "Android", "BlackBerry"],
        rows: [
          ["Next channels", "Swipe left", "Swipe left", "Press N key"],
          ["Previous channels", "Swipe right", "Swipe right", "Press P key"],
          ["Full screen", "Double-tap channel", "Double-tap channel", "Select + press trackpad"],
          ["Return to grid", "Double-tap again", "Press Back button", "Press trackpad or Escape"],
        ],
      },
      { type: "heading", text: "Screen Division Options" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "While connected, tap the Division option.",
            "Select 4, 9, or 16 screen divisions.",
          ],
          Android: [
            "Press Menu, tap Setting.",
            "Under Layout, select from: 1, 4, 8, 9, 16, 25, or 36 divisions.",
          ],
          BlackBerry: [
            "Press Menu, select Setting.",
            "Under Layout, choose your preferred division count.",
          ],
        },
      },
      { type: "callout", variant: "tip", title: "Quick Access", text: "In full screen mode, swipe left/right to quickly cycle through individual channels without returning to the grid view." },
    ],
  },
  "mob-channel-mapping": {
    title: "Channel Mapping",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["channels", "mapping", "layout"],
    body: [
      { type: "intro", text: "Channel mapping lets you rearrange which camera channels appear in which screen positions. Assign your most important cameras to the first positions so they display immediately upon connecting." },
      { type: "heading", text: "iOS" },
      { type: "paragraph", text: "Touch and hold a video channel on screen. The Channel Mapping window appears. Tap each position to select which camera channel should display there." },
      { type: "heading", text: "Android & BlackBerry" },
      { type: "paragraph", text: "Access channel mapping through Menu → Setting → Channel mapping. Assign channels to screen positions in the order most convenient for your monitoring workflow." },
      { type: "callout", variant: "tip", title: "Best Practice", text: "If your default layout is 4 divisions, assign the four most critical cameras to positions 1–4. These will be the first channels displayed when you connect." },
    ],
  },
  "mob-disconnect": {
    title: "Disconnect & Exit",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["disconnect", "exit", "data"],
    body: [
      { type: "intro", text: "When you're done viewing, properly disconnecting and exiting the app prevents unwanted data streaming to your device." },
      { type: "callout", variant: "warning", title: "Important", text: "Simply switching away from the app does not stop data streaming. You must fully exit the app to stop all data transfer." },
      { type: "heading", text: "iOS" },
      {
        type: "steps",
        items: [
          "Double-click the Home button to open the multitasking view.",
          "Touch and hold the SRX-Pro app until icons begin to jiggle.",
          "Tap the minus sign next to SRX-Pro to close it completely.",
        ],
      },
      { type: "heading", text: "Android" },
      {
        type: "steps",
        items: [
          "To disconnect without exiting: press Menu → Disconnect → Yes.",
          "To exit completely: press Back until the exit confirmation appears, or press Menu → More → Close → Yes.",
        ],
      },
      { type: "heading", text: "BlackBerry" },
      {
        type: "steps",
        items: [
          "Press Menu and select Disconnect (or press D key).",
          "Select Yes in the confirmation window.",
        ],
      },
    ],
  },
  "mob-video-settings": {
    title: "Video Quality & Frame Rate",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["settings", "video", "quality", "fps"],
    body: [
      { type: "intro", text: "Adjust video quality and frame rate to balance image clarity against data usage and device performance. These settings apply to all channels of the connected server." },
      { type: "heading", text: "Frame Rate" },
      { type: "paragraph", text: "The frame rate can be set from 1 fps to 30 fps. Lower frame rates reduce data consumption but produce choppier video. Higher frame rates give smoother playback but use more bandwidth." },
      { type: "heading", text: "Video Quality" },
      { type: "paragraph", text: "Video quality can be set from 10% to 100% in 10% increments. Lower quality reduces data usage at the cost of image clarity. Higher quality produces sharper images but increases bandwidth consumption." },
      { type: "heading", text: "Recommended Settings" },
      {
        type: "table",
        headers: ["Connection Type", "Frame Rate", "Video Quality", "Notes"],
        rows: [
          ["Wi-Fi (local)", "15–30 fps", "70–100%", "Best quality, no data charges"],
          ["Wi-Fi (remote)", "10–20 fps", "50–80%", "Balance quality with network latency"],
          ["Cellular (LTE)", "5–10 fps", "30–50%", "Minimize data usage"],
          ["Cellular (roaming)", "1–5 fps", "10–30%", "Absolute minimum to reduce roaming charges"],
        ],
      },
      { type: "callout", variant: "info", title: "How to Access", text: "Connect to a server first, then access Settings. On iOS, tap Settings. On Android/BlackBerry, press Menu → Setting." },
    ],
  },
  "mob-ratio-view": {
    title: "Ratio View",
    updated: "2026-03-10",
    readTime: "1 min",
    tags: ["settings", "display", "ratio"],
    body: [
      { type: "intro", text: "Ratio View controls how the camera feed is displayed relative to your device's screen." },
      { type: "heading", text: "Options" },
      {
        type: "table",
        headers: ["Setting", "Behavior"],
        rows: [
          ["Stretch", "Stretches the video to fill the device's screen, which may distort the image"],
          ["Keep Origin Ratio", "Maintains the camera's native aspect ratio, which may leave black bars on the sides"],
        ],
      },
      { type: "callout", variant: "tip", title: "Recommendation", text: "Use Keep Origin Ratio for accurate scene representation. Use Stretch only when maximizing screen real estate is more important than aspect accuracy." },
    ],
  },
  "mob-alarm-settings": {
    title: "Alarm Settings",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["settings", "alarms", "notifications"],
    body: [
      { type: "intro", text: "Configure how the app responds to alarm events from connected SRX-Pro servers. Available on Android and BlackBerry (available in both online and offline settings modes)." },
      { type: "heading", text: "Alarm Types" },
      {
        type: "table",
        headers: ["Alarm Type", "Trigger", "Available Responses"],
        rows: [
          ["Sensor triggered", "Sensor alarm detected on connected server", "Play sound, full screen related channel"],
          ["Motion", "Motion detection alarm on connected server", "Play sound, full screen related channel"],
          ["Video loss", "Video signal lost on a camera channel", "Play sound"],
          ["Stop recording", "Server has stopped recording", "Play sound"],
        ],
      },
      { type: "heading", text: "Configuration" },
      {
        type: "list",
        items: [
          "Enable each alarm type by ticking its checkbox",
          "Tick Play a sound to enable audio alerts — tap the audio file button to select a custom alert sound",
          "Tick Full screen related channel to automatically switch to the affected camera (sensor and motion alarms only)",
          "Adjust the Volume Level slider for alert audio",
          "Tap Save to apply changes, or Reset Default to restore factory settings",
        ],
      },
      { type: "callout", variant: "info", title: "Server-Side Requirements", text: "For sensor alarms to trigger full screen display, the channel must be assigned to the enabled sensor on the SRX-Pro Server. For motion alarms, motion detection must be enabled on the relevant channels." },
    ],
  },
  "mob-ptz": {
    title: "PTZ Camera Control",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["ptz", "camera", "control"],
    body: [
      { type: "intro", text: "Remotely pan, tilt, and zoom PTZ cameras connected to your SRX-Pro server directly from the mobile app." },
      { type: "heading", text: "Prerequisites" },
      {
        type: "list",
        items: [
          "Connected to a remote SRX-Pro server",
          "PTZ camera configured and connected to the server",
        ],
      },
      { type: "heading", text: "Controls by Platform" },
      {
        type: "table",
        headers: ["Action", "iOS", "Android", "BlackBerry"],
        rows: [
          ["Enter PTZ mode", "Full screen → tap PTZ icon (top-right)", "Full screen the PTZ channel", "Full screen the PTZ channel"],
          ["Pan / Tilt", "Touch and hold directional arrows", "Touch and hold screen in desired direction", "Use on-screen controls or keyboard"],
          ["Zoom In", "Tap + icon", "Pinch out", "Press I key"],
          ["Zoom Out", "Tap − icon", "Pinch in", "Press O key"],
          ["Stop movement", "Lift finger from screen", "Lift finger from screen", "Release key"],
        ],
      },
      { type: "callout", variant: "tip", title: "Finding the PTZ Channel", text: "If the PTZ camera isn't visible in the current screen division, keep swiping to cycle through channels until you locate it, then double-tap to enter full screen mode." },
    ],
  },
  "mob-snapshot": {
    title: "Taking Snapshots",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["snapshot", "capture", "email"],
    body: [
      { type: "intro", text: "Capture still images from live camera feeds. Snapshots can be saved to your device or sent via email." },
      { type: "heading", text: "Save a Snapshot" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Connect to the server and double-tap a channel for full screen.",
            "Tap Snapshot.",
            "Tap Save Snapshot.",
            "Wait for the confirmation message and tap OK.",
            "Find the snapshot in Photos → Camera Roll.",
          ],
          Android: [
            "Connect to the server. Tap the channel to select it (red frame) or double-tap for full screen.",
            "Press Menu → Snapshot.",
            "A confirmation shows the filename and save location.",
            "Find snapshots in File Manager → Internal storage → i3data → images.",
          ],
        },
      },
      { type: "heading", text: "Snapshot Filename Format (Android)" },
      { type: "code", language: "text", code: "Channel##_Resolution_YYYY_MM_DD_HH_MM_SS.jpg" },
      { type: "heading", text: "Send Snapshot via Email (iOS)" },
      {
        type: "steps",
        items: [
          "Connect and enter full screen mode on the desired channel.",
          "Tap Snapshot.",
          "Tap Send via E-mail.",
          "The email compose screen opens with the snapshot attached.",
          "Enter recipient addresses, subject line, and tap Send.",
        ],
      },
    ],
  },
  "mob-alarm-logs": {
    title: "Searching Alarm Logs",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["alarms", "logs", "search", "history"],
    body: [
      { type: "intro", text: "Search and review alarm event history from your connected SRX-Pro server. Filter by event type and configure the time window." },
      { type: "heading", text: "Steps" },
      {
        type: "tabs",
        platforms: {
          iOS: [
            "Connect to the server.",
            "Tap Alarms.",
            "The History Alarms list shows events for the configured number of days (1–5).",
            "Use the filter to view specific event types: All, Sensor, Stop Recording, Video Loss, or Motion.",
          ],
          Android: [
            "Connect to the server.",
            "Press Menu → Alarm List.",
            "The History Alarms list shows events for the configured number of days.",
            "Tap the Filter by dropdown to select: All, Motion, Sensor, Stop Recording, or Video Loss.",
          ],
        },
      },
      { type: "heading", text: "Configuring Log Settings" },
      {
        type: "table",
        headers: ["Setting", "Description", "Options"],
        rows: [
          ["View alarm list in", "Number of days of alarm history to display", "1–5 days"],
          ["Alarm logs searching by", "Default event type filter applied when opening logs", "All, Motion, Sensor, Stop Recording, Video Loss"],
        ],
      },
      { type: "callout", variant: "tip", title: "Quick Filtering", text: "Set a default filter in Settings if you typically monitor a specific alarm type. You can always change the filter after opening the log." },
    ],
  },
  "mob-hotkeys": {
    title: "Keyboard Shortcuts (Android)",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["shortcuts", "hotkeys", "android"],
    body: [
      { type: "intro", text: "The Android version of SRX-Pro Mobile Remote supports keyboard shortcuts for devices with physical keyboards." },
      { type: "heading", text: "General Shortcuts" },
      {
        type: "table",
        headers: ["Key", "Function"],
        rows: [
          ["Space", "Switch multi-view layout"],
          ["N", "Next channel(s)"],
          ["P", "Previous channel(s)"],
          ["T", "Take snapshot"],
          ["D", "Disconnect from server"],
          ["M", "Minimize app"],
          ["A", "About screen"],
          ["H", "Help"],
        ],
      },
      { type: "heading", text: "PTZ Control Shortcuts" },
      {
        type: "table",
        headers: ["Key", "Function"],
        rows: [
          ["S", "Pan left"],
          ["F", "Pan right"],
          ["E", "Tilt up"],
          ["X", "Tilt down"],
          ["W", "Left + Up (diagonal)"],
          ["Z", "Left + Down (diagonal)"],
          ["R", "Right + Up (diagonal)"],
          ["C", "Right + Down (diagonal)"],
          ["I", "Zoom in"],
          ["O", "Zoom out"],
        ],
      },
    ],
  },
  "mob-troubleshoot": {
    title: "Troubleshooting",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["troubleshooting", "errors", "connection"],
    body: [
      { type: "intro", text: "Common issues and resolutions when using the SRX-Pro Mobile Remote app." },
      { type: "heading", text: "Connection Issues" },
      {
        type: "table",
        headers: ["Symptom", "Possible Cause", "Resolution"],
        rows: [
          ["Cannot connect — error displayed", "Server ID, IP, username, or password mismatch", "Verify all four values match the SRX-Pro Server configuration in Server Info Setup and User Management tabs"],
          ["Cannot connect — no response", "Server not reachable on the network", "Verify the server is online, check firewall rules for port 13225, confirm the IP address or DDNS is correct"],
          ["Connection drops frequently", "Unstable network or cellular signal", "Switch to Wi-Fi if possible; lower frame rate and video quality to reduce bandwidth requirements"],
          ["High data charges", "App was not fully closed after use", "Always exit the app completely to stop data streaming — simply switching apps does not disconnect"],
        ],
      },
      { type: "heading", text: "Video Issues" },
      {
        type: "table",
        headers: ["Symptom", "Possible Cause", "Resolution"],
        rows: [
          ["Video is choppy / laggy", "Frame rate too high for current bandwidth", "Reduce frame rate in Settings (try 5–10 fps on cellular)"],
          ["Video is grainy / blurry", "Video quality set too low", "Increase video quality percentage in Settings"],
          ["Black screen on some channels", "Camera disconnected or video loss on server", "Check the camera connection on the SRX-Pro Server; review alarm logs for Video Loss events"],
          ["Stretched / distorted image", "Ratio View set to Stretch", "Change Ratio View to Keep Origin Ratio in Settings"],
        ],
      },
    ],
  },
  "srx-overview": {
    title: "SRX-Pro Server — Overview",
    updated: "2026-03-01",
    readTime: "2 min",
    tags: ["srx-pro", "server"],
    body: [
      { type: "intro", text: "The SRX-Pro Server is the core recording and management platform for i3 surveillance systems. This section covers server setup, configuration, and administration." },
      { type: "callout", variant: "info", title: "Placeholder", text: "Detailed SRX-Pro Server documentation will be populated as additional content is authored. The structure is ready for content migration." },
    ],
  },
  "srx-server-info": {
    title: "Server Info Setup",
    updated: "2026-03-01",
    readTime: "2 min",
    tags: ["server", "configuration"],
    body: [
      { type: "intro", text: "The Server Info Setup tab on the SRX-Pro Server is where you configure the server's identity for remote connections — including Server ID, IP address, and DDNS settings." },
      { type: "callout", variant: "info", title: "Placeholder", text: "This page will contain the full Server Info Setup guide. Mobile app users need values from this tab when adding remote connections." },
    ],
  },
  "srx-user-mgmt": {
    title: "User Management",
    updated: "2026-03-01",
    readTime: "2 min",
    tags: ["users", "security"],
    body: [
      { type: "intro", text: "The User Management Setup tab is where you create and manage user accounts for local and remote access to the SRX-Pro Server." },
      { type: "callout", variant: "info", title: "Placeholder", text: "This page will contain the full User Management guide. Mobile app users need credentials created here to connect remotely." },
    ],
  },
  "api-auth": {
    title: "API Authentication",
    updated: "2026-03-05",
    readTime: "2 min",
    tags: ["api", "authentication"],
    body: [
      { type: "intro", text: "API authentication documentation for programmatic access to i3 services." },
      { type: "callout", variant: "info", title: "Placeholder", text: "API documentation will be populated as the integration layer is documented." },
    ],
  },
  "api-endpoints": {
    title: "API Endpoints",
    updated: "2026-03-05",
    readTime: "2 min",
    tags: ["api", "endpoints"],
    body: [
      { type: "intro", text: "Available API endpoints for device management, video access, and system integration." },
      { type: "callout", variant: "info", title: "Placeholder", text: "Endpoint documentation will be populated as the API is documented." },
    ],
  },
  "api-webhooks": {
    title: "Webhooks",
    updated: "2026-03-05",
    readTime: "2 min",
    tags: ["api", "webhooks"],
    body: [
      { type: "intro", text: "Webhook configuration for receiving real-time event notifications from i3 systems." },
      { type: "callout", variant: "info", title: "Placeholder", text: "Webhook documentation will be populated as the integration layer is documented." },
    ],
  },
  "vpc-overview": {
    title: "Video Pilot Client (VPC) — Overview",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["vpc", "desktop", "remote"],
    body: [
      { type: "intro", text: "Video Pilot Client (VPC) is i3 International's desktop remote viewing software. Connect to one or more SRX-Pro Servers to view live video, search recordings, create backups, and run AI-powered analytics from a remote workstation." },
      { type: "heading", text: "Key Features" },
      { type: "list", items: ["Connect to multiple SRX-Pro servers simultaneously", "View up to 64 cameras (2×2 through 8×8 screen divisions)", "Quick Search for current-day video with timeline navigation", "Calendar-based historical video search", "Advanced search: Interval, Object, Event Recording, Face Optimization, Heatmap, AiSearch", "Video backup in MP4, AVI, or i3 encrypted (tamper-proof) format", "PTZ and 360° fisheye camera control", "Color-tagging cameras for fast identification and filtering", "Favorites folders for custom camera groupings across servers", "Facility maps with camera overlay and linked camera tracking", "i3Host single sign-on with MFA support", "Cloud search and cloud backup retrieval", "Dual streaming — HD and VGA modes"] },
      { type: "heading", text: "VPC Modes" },
      { type: "table", headers: ["Mode", "Purpose"], rows: [["CONTROL", "Manage server connections, cameras, favorites, maps, and archived files"], ["LIVE", "View live camera feeds from connected servers"], ["SEARCH", "Search recorded video by date, time, or analytics"], ["BACKUP", "Create video backups in JPG, AVI, MP4, or i3 encrypted format"]] },
      { type: "callout", variant: "info", title: "Server Compatibility", text: "VPC requires SRX-Pro Server v3.0 or higher. VPC v7.3 supports i3Host authentication and cloud features." },
    ],
  },
  "vpc-launch": {
    title: "Launch & Login",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["login", "launch", "password"],
    body: [
      { type: "intro", text: "Launch VPC from your desktop and authenticate to begin remote monitoring." },
      { type: "heading", text: "Launch VPC" },
      { type: "steps", items: ["Double-click the Video Pilot Client icon on your Desktop.", "The Login screen appears. Enter your User Name and Password.", "Click Login.", "The VPC main screen loads with the CONTROL panel — Servers tab displayed by default."] },
      { type: "heading", text: "Skip Login (Optional)" },
      { type: "paragraph", text: "If VPC is used at a secure location: click the Help icon, select Options, and uncheck \"Start VPClient with password.\" Or check \"Remember Login Info\" on the login screen." },
      { type: "heading", text: "Forgot Password" },
      { type: "steps", items: ["On the Login screen, enter your User Name and click Forgot Password.", "Answer your Security Question (set during first installation).", "Enter new credentials and Security Question.", "Click Submit. Log in with your new password."] },
    ],
  },
  "vpc-ui": {
    title: "Navigating the Interface",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["interface", "ui", "navigation"],
    body: [
      { type: "intro", text: "VPC's interface maximizes screen space for video. Non-essential GUI elements hide until you hover your mouse over them." },
      { type: "heading", text: "Control Panel Tabs" },
      { type: "table", headers: ["Tab", "Purpose"], rows: [["Servers", "Repository of remote SRX-Pro Server connections with camera thumbnails"], ["Cameras", "Browse all cameras across servers; supports color-tagging"], ["Favorites", "Custom camera groupings for one-click connection"], ["Maps", "Facility floor plan overlays with camera icons and linked camera tracking"], ["Archived Files", "Linked backup locations for instant saved video playback"]] },
      { type: "heading", text: "Control Panel Views" },
      { type: "paragraph", text: "Each tab supports three views: Large Thumbnail, Small Thumbnail, and Details. Hover over a tab and click the View icon to cycle through them." },
      { type: "callout", variant: "tip", title: "LIVE Mode Auto-Hide", text: "In LIVE mode, the GUI hides after 1 minute of inactivity so cameras fill the entire screen. Move your mouse to reveal the interface." },
      { type: "heading", text: "Search Bar" },
      { type: "paragraph", text: "The search bar works across all modes — filter cameras, servers, groups, favorites, map names, and archived files by typing text or selecting a color tag." },
    ],
  },
  "vpc-screen-div": {
    title: "Screen Divisions",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["screen", "layout", "division"],
    body: [
      { type: "intro", text: "Screen divisions control how many cameras display simultaneously. Up to 64 cameras can be viewed at once." },
      { type: "table", headers: ["Division", "Cameras"], rows: [["2×2", "4"], ["6", "6"], ["3×3", "9"], ["10", "10"], ["5×5", "25"], ["6×6", "36"], ["8×8", "64"]] },
      { type: "heading", text: "Navigation Controls" },
      { type: "list", items: ["Previous/Next Screen — manually cycle through camera sets within the selected division", "Rotate — automatically displays the next set of cameras every 3 seconds (LIVE mode only)", "Default — resets cameras to their original screen positions after rearranging"] },
    ],
  },
  "vpc-add-server": {
    title: "Add a Server (Manual)",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["server", "connection", "add"],
    body: [
      { type: "intro", text: "Manually add an individual SRX-Pro Server connection by entering its network details." },
      { type: "steps", items: ["Click the CONTROL tab, then the Servers tab.", "Hover over the Add Server tile and click Add Server.", "Enter: Server Name, Server Address (IP or DDNS), Port, Server ID, Username, and Password.", "Click Save.", "The new server appears in your list. Hover over it and click Connect."] },
      { type: "callout", variant: "info", title: "Need Help?", text: "Contact your installer or integrator for server connection details. Address, ID, and credentials must match the SRX-Pro Server configuration." },
    ],
  },
  "vpc-add-i3host": {
    title: "Connect via i3Host",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["i3host", "sso", "authentication"],
    body: [
      { type: "intro", text: "i3Host serves as the single access point for all i3 products. CMS subscribers can import all SRX-Pro NVRs from their domain in one step." },
      { type: "heading", text: "Steps (VPC v7.3)" },
      { type: "steps", items: ["Click the CONTROL tab. Hover over the Add Server tile, then click i3Host.", "The i3Host login form appears. Enter your i3Host Email and Password.", "Click SAVE AND DOWNLOAD DATA.", "After logging in, the companies you have permission to access are listed.", "For each company, click Download to retrieve its NVR list.", "Connect to individual NVRs to begin viewing camera video."] },
      { type: "callout", variant: "info", title: "Single Company", text: "If you only have permission to access one company, the NVR list downloads automatically." },
      { type: "callout", variant: "tip", title: "Multi-Factor Authentication", text: "i3Host supports email OTP, phone SMS, and authenticator apps (Google Authenticator, Microsoft Authenticator)." },
    ],
  },
  "vpc-add-cms": {
    title: "Connect via CMS Server",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["cms", "server", "domain"],
    body: [
      { type: "intro", text: "Import all SRX-Pro Server connections from a CMS domain at once." },
      { type: "steps", items: ["Click the CONTROL tab. Hover over the Add Server tile.", "Select CMS server → Add CMS Server.", "Fill out the CMS Server connection information.", "Click SAVE AND DOWNLOAD DATA.", "Click Download to import all SRX-Pro connections."] },
    ],
  },
  "vpc-server-groups": {
    title: "Server Groups",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["groups", "servers", "organization"],
    body: [
      { type: "intro", text: "Group multiple servers together for one-click connection when monitoring many locations." },
      { type: "heading", text: "Connect to a Group" },
      { type: "paragraph", text: "In the Servers tab, hover over a server group and click Connect to connect to all servers in the group. Hold Ctrl and click to select multiple groups." },
      { type: "callout", variant: "warning", title: "Limitations", text: "A server cannot belong to multiple groups. VPC displays a maximum of 64 cameras from connected servers." },
    ],
  },
  "vpc-disconnect": {
    title: "Disconnect from Servers",
    updated: "2026-03-10",
    readTime: "1 min",
    tags: ["disconnect", "bandwidth"],
    body: [
      { type: "intro", text: "Disconnect from servers when not actively monitoring to conserve internet bandwidth." },
      { type: "callout", variant: "warning", title: "Bandwidth", text: "Remote monitoring consumes internet bandwidth continuously. Always disconnect or close VPC when not actively viewing." },
      { type: "paragraph", text: "In the Servers tab, hover over the connected server or group and click Disconnect. Closing VPC drops all connections." },
    ],
  },
  "vpc-cam-connect": {
    title: "Connect to Cameras",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["cameras", "connect", "select"],
    body: [
      { type: "intro", text: "Select specific cameras to monitor instead of connecting to entire servers." },
      { type: "steps", items: ["Click the CONTROL tab → Cameras tab.", "Browse cameras grouped by server.", "Select individual cameras (Ctrl+click for multiple).", "Hover over a selected camera and click Connect."] },
      { type: "callout", variant: "info", title: "64-Camera Limit", text: "VPC displays a maximum of 64 cameras at one time. Your user access level determines which cameras are visible." },
    ],
  },
  "vpc-favorites": {
    title: "Favorites",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["favorites", "groups", "cameras"],
    body: [
      { type: "intro", text: "Create custom camera groupings for one-click monitoring. Group cameras from different servers into a single folder (e.g., all front-door cameras)." },
      { type: "steps", items: ["Click CONTROL → Favorites tab.", "Create a new folder and name it.", "Add cameras from any connected server.", "Hover over the folder and click Connect to view all cameras."] },
    ],
  },
  "vpc-color-tags": {
    title: "Color Tags",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["color", "tags", "organization"],
    body: [
      { type: "intro", text: "Assign one of six colors (Red, Orange, Yellow, Green, Blue) to cameras for fast visual identification." },
      { type: "heading", text: "Assign a Color Tag" },
      { type: "steps", items: ["Go to CONTROL → Cameras tab.", "Hover over the camera, click More.", "Select your desired color."] },
      { type: "heading", text: "Filter by Color" },
      { type: "paragraph", text: "In the search bar, click the target icon and select a color to filter the camera list across all VPC modes." },
    ],
  },
  "vpc-maps": {
    title: "Maps & Linked Cameras",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["maps", "linked", "facility"],
    body: [
      { type: "intro", text: "Load a facility floor plan into VPC and overlay camera icons at their physical locations. Nearby cameras are automatically linked for subject tracking." },
      { type: "steps", items: ["Go to CONTROL → Maps tab.", "Add a facility map image.", "Drag camera icons onto the map at physical locations.", "Save the configuration."] },
      { type: "callout", variant: "tip", title: "Linked Cameras", text: "When viewing a camera live, switch to linked cameras nearby on the map to track a subject moving through different zones of the facility." },
    ],
  },
  "vpc-live-controls": {
    title: "On-Screen Controls (Quick Menu)",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["live", "controls", "quick-menu"],
    body: [
      { type: "intro", text: "Hover over any live camera to reveal the Quick Menu with on-screen controls." },
      { type: "table", headers: ["Control", "Function"], rows: [["Snapshot", "Save current frame as JPG"], ["Video quality", "Switch HD (main) / Sub stream"], ["Interactive view", "Select fisheye viewing angle"], ["Preset & tour", "Cycle fisheye presets"], ["History faces", "List of recognized faces"], ["PTZ", "PTZ speed control"], ["Linked cameras", "View nearby cameras on map"], ["POS/OSD", "Toggle text overlays on/off"], ["Quick Search", "Current-day video lookup"]] },
    ],
  },
  "vpc-ptz": {
    title: "PTZ & Fisheye Control",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["ptz", "fisheye", "360", "zoom"],
    body: [
      { type: "intro", text: "Control PTZ and 360° fisheye cameras directly from VPC." },
      { type: "heading", text: "PTZ Control" },
      { type: "paragraph", text: "Hover over a PTZ camera and click the PTZ icon in the Quick Menu. Use directional arrows to pan/tilt and zoom controls for zoom." },
      { type: "heading", text: "Fisheye Camera" },
      { type: "paragraph", text: "Click Interactive view for dewarped viewing angles. Use Preset & tour to configure and cycle through saved positions." },
      { type: "heading", text: "Digital Zoom" },
      { type: "paragraph", text: "Double-click a camera for full screen. Scroll mouse wheel to zoom in/out. A preview window appears in the top-right corner — drag within it to pan." },
    ],
  },
  "vpc-quick-search": {
    title: "Quick Search",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["search", "quick", "timeline"],
    body: [
      { type: "intro", text: "Fast video lookup for the current 24-hour day without leaving LIVE mode." },
      { type: "callout", variant: "info", title: "Current Day Only", text: "Quick Search covers the current day. For historical video, use Calendar Search in the SEARCH tab." },
      { type: "steps", items: ["Hover over the camera in LIVE view.", "Click the magnifying glass icon in the Quick Menu.", "The Quick Search timeline appears below the camera.", "Scroll up/down to zoom the timeline (10 minutes to 24 hours).", "Click the timeline to jump to that time."] },
      { type: "heading", text: "Quick Backup" },
      { type: "steps", items: ["Drag the green (start) and red (end) triangles to mark the clip.", "Select format: i3d, AVI, or MP4.", "Click Add to List or Save to."] },
    ],
  },
  "vpc-calendar-search": {
    title: "Calendar Search",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["search", "calendar", "historical"],
    body: [
      { type: "intro", text: "Search video recorded on any date using the SEARCH tab calendar." },
      { type: "steps", items: ["Click the SEARCH tab.", "Click the Calendar icon.", "Select a date — RED dates have video, GREY dates have none.", "Navigate the timeline using the same controls as Quick Search."] },
    ],
  },
  "vpc-advanced-search": {
    title: "Advanced Search",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["search", "analytics", "ai"],
    body: [
      { type: "intro", text: "Powerful search capabilities beyond simple time-based lookup." },
      { type: "table", headers: ["Type", "Description"], rows: [["Interval", "Thumbnail storyboard at fixed intervals (1 second to 1 hour)"], ["Object", "Draw a motion grid to find activity in a specific area"], ["Event Recording", "Search by recording trigger type"], ["Face Optimization", "Search recognized faces"], ["Heatmap", "Visualize activity patterns"], ["AiSearch", "AI-powered object detection"]] },
      { type: "steps", items: ["In the SEARCH tab, select one channel.", "Click the Advanced Search icon.", "Choose your search type from the panel."] },
      { type: "callout", variant: "tip", title: "Object Search", text: "For best results, use on video recorded indoors with constant lighting. Draw the motion grid over the area of interest." },
    ],
  },
  "vpc-backup-create": {
    title: "Create a Video Backup",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["backup", "export", "video"],
    body: [
      { type: "intro", text: "Create video backups to local storage, OneDrive, or server storage." },
      { type: "steps", items: ["Click the BACKUP tab → Add a Backup.", "1. Channels: Select one or more channels (Ctrl/Shift for multiple).", "2. Date/Time: Set the From and To date and time.", "3. Type: Select MP4, AVI, or i3 encrypted (tamper-proof).", "(Optional) Click Show advanced settings for text embed or stream selection.", "4. Destination: Choose Local Storage, Local OneDrive, or Server Storage.", "Click Add To List, then click Start.", "Wait for status to change from Ready to Finished."] },
      { type: "callout", variant: "info", title: "Default Location", text: "Local backups save to D:\\i3backup by default." },
    ],
  },
  "vpc-backup-formats": {
    title: "Backup Formats",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["backup", "format", "encrypted"],
    body: [
      { type: "intro", text: "Three formats for different use cases." },
      { type: "table", headers: ["Format", "Extension", "Use Case"], rows: [["MP4", ".mp4", "Standard format playable in any media player. Supports text overlay."], ["AVI", ".avi", "Legacy standard format. Supports text overlay."], ["i3 Encrypted", ".i3d / .i3c", "Tamper-proof. Multiple cameras in one file. Requires VPC Player."]] },
      { type: "callout", variant: "tip", title: "Evidence Integrity", text: "Use i3 encrypted format when video may be needed as evidence. Cannot be edited. Each backup includes a copy of VPC Player." },
    ],
  },
  "vpc-player-overview": {
    title: "VPC Player — Overview",
    updated: "2026-03-10",
    readTime: "2 min",
    tags: ["player", "encrypted", "playback"],
    body: [
      { type: "intro", text: "VPC Player is the dedicated player for i3's encrypted video (.i3d and .i3c). Each encrypted backup includes a copy of VPC Player for self-contained playback." },
      { type: "list", items: ["Encrypted video cannot be edited — ensures evidence integrity", "Multiple cameras saved and played in a single file", "Self-contained — open the shortcut in your backup folder", "Supports digital zoom, fisheye dewarping, and snapshot capture", "English and French interface"] },
      { type: "heading", text: "Open a Different Clip" },
      { type: "steps", items: ["Go to the CONTROL tab.", "Hover over Add Backup File and click Browse.", "Select the folder containing .i3d or .i3c files.", "Hover over the clip and click Play."] },
      { type: "callout", variant: "info", title: "Other Formats", text: "VPC Player also displays .mp4, .avi, and .jpg files. MP4/AVI open in Windows Media Player. JPG snapshots view directly in VPC Player." },
    ],
  },
  "vpc-player-playback": {
    title: "Playback Controls",
    updated: "2026-03-10",
    readTime: "3 min",
    tags: ["playback", "timeline", "controls"],
    body: [
      { type: "intro", text: "Universal and per-channel playback controls with color-coded recording timeline." },
      { type: "heading", text: "Universal Controls (all channels)" },
      { type: "table", headers: ["Control", "Function"], rows: [["Play / Pause", "Start or pause all channels"], ["Fast Forward", "2×/4×/8×/16× speed (click repeatedly)"], ["Rewind", "2×/4×/8×/16× speed (click repeatedly)"], ["Timeline marker", "Click or drag to set playback start time"]] },
      { type: "heading", text: "Per-Channel Controls" },
      { type: "paragraph", text: "Hover over any channel to reveal its own playback controls. When using per-channel controls, only that channel plays — all others remain paused." },
      { type: "heading", text: "Recording Type Colors" },
      { type: "table", headers: ["Color", "Recording Type"], rows: [["Magenta (Pink)", "Continuous"], ["Navy Blue", "Motion"], ["Orange", "Sensor"], ["Green", "Sensor + Motion"], ["Light Blue", "Sensor + Motion + i3Ai"], ["Neon Green", "i3Ai"]] },
    ],
  },
};

const DEFAULT_CONTENT = {
  title: "Page Title", updated: "2026-03-01", readTime: "1 min", tags: [],
  body: [
    { type: "intro", text: "Content will be populated as documentation is authored." },
    { type: "callout", variant: "info", title: "Placeholder", text: "Structural placeholder — content coming soon." },
  ],
};

// ─── Utility ─────────────────────────────────────────────────────────────────
function flattenTree(nodes, parent = null, depth = 0) {
  let result = [];
  for (const node of nodes) {
    result.push({ ...node, parent, depth });
    if (node.children) result = result.concat(flattenTree(node.children, node.id, depth + 1));
  }
  return result;
}
function getBreadcrumbs(nodeId, flatNodes) {
  const crumbs = [];
  let cur = flatNodes.find((n) => n.id === nodeId);
  while (cur) { crumbs.unshift({ id: cur.id, label: cur.label }); cur = flatNodes.find((n) => n.id === cur.parent); }
  return crumbs;
}
function getAllContentNodes(fn) { return fn.filter((n) => n.content); }

// ─── Platform Tabs ───────────────────────────────────────────────────────────
function PlatformTabs({ platforms }) {
  const keys = Object.keys(platforms);
  const [active, setActive] = useState(keys[0]);
  const icons = { iOS: "", Android: "", BlackBerry: "" };
  return (
    <div style={styles.tabsWrap}>
      <div style={styles.tabBar}>
        {keys.map((k) => (
          <button key={k} onClick={() => setActive(k)} style={{ ...styles.tab, borderBottom: active === k ? "2px solid #00588F" : "2px solid transparent", color: active === k ? "#00588F" : "#666", fontWeight: active === k ? 600 : 400 }}>
            <span style={{ marginRight: 4 }}>{icons[k] || ""}</span>{k}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 16px" }}>
        <ol style={{ ...styles.steps, margin: 0 }}>
          {platforms[active].map((step, i) => (
            <li key={i} style={styles.stepItem}><span style={styles.stepNum}>{i + 1}</span><span>{step}</span></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ─── Content Renderer ────────────────────────────────────────────────────────
function ContentBlock({ block }) {
  switch (block.type) {
    case "intro": return <p style={styles.intro}>{block.text}</p>;
    case "heading": return <h2 style={styles.h2}>{block.text}</h2>;
    case "paragraph": return <p style={styles.paragraph}>{block.text}</p>;
    case "callout": return <Callout variant={block.variant} title={block.title} text={block.text} />;
    case "list": return <ul style={styles.list}>{block.items.map((item, i) => <li key={i} style={styles.listItem}>{item}</li>)}</ul>;
    case "steps": return <ol style={styles.steps}>{block.items.map((item, i) => <li key={i} style={styles.stepItem}><span style={styles.stepNum}>{i + 1}</span><span>{item}</span></li>)}</ol>;
    case "table": return <DocTable headers={block.headers} rows={block.rows} />;
    case "code": return <CodeBlock language={block.language} code={block.code} />;
    case "tabs": return <PlatformTabs platforms={block.platforms} />;
    case "grid": return <div style={styles.grid}>{block.items.map((item, i) => <div key={i} style={styles.gridCard}><strong style={styles.gridTitle}>{item.title}</strong><span style={styles.gridDesc}>{item.desc}</span></div>)}</div>;
    default: return null;
  }
}
function Callout({ variant, title, text }) {
  const v = { info: { bg: "#e8f4fa", border: "#00588F", icon: "i", iconBg: "#00588F" }, warning: { bg: "#fef3e0", border: "#f5a623", icon: "!", iconBg: "#f5a623" }, tip: { bg: "#fdf0f5", border: "#DF1E71", icon: "\u2713", iconBg: "#DF1E71" } }[variant] || { bg: "#e8f4fa", border: "#00588F", icon: "i", iconBg: "#00588F" };
  return <div style={{ ...styles.callout, backgroundColor: v.bg, borderLeftColor: v.border }}><div style={styles.calloutHeader}><span style={{ marginRight: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", backgroundColor: v.iconBg, color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{v.icon}</span><strong>{title}</strong></div><p style={styles.calloutText}>{text}</p></div>;
}
function DocTable({ headers, rows }) {
  return <div style={styles.tableWrap}><table style={styles.table}><thead><tr>{headers.map((h, i) => <th key={i} style={styles.th}>{h}</th>)}</tr></thead><tbody>{rows.map((row, ri) => <tr key={ri} style={ri % 2 === 1 ? styles.trAlt : {}}>{row.map((cell, ci) => <td key={ci} style={styles.td}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);
  return <div style={styles.codeWrap}><div style={styles.codeHeader}><span style={styles.codeLang}>{language}</span><button style={styles.copyBtn} onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? "✓ Copied" : "Copy"}</button></div><pre style={styles.pre}><code>{code}</code></pre></div>;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function SidebarNode({ node, depth, activeId, onSelect, expandedSections, toggleSection }) {
  const isActive = node.id === activeId, hasChildren = !!node.children?.length, isExpanded = expandedSections.has(node.id), isTop = depth === 0;
  return <div>
    <button onClick={() => { if (node.content) onSelect(node.id); if (hasChildren) toggleSection(node.id); }} style={{ ...styles.sidebarItem, paddingLeft: isTop ? 12 : 12 + depth * 16, fontWeight: isTop ? 700 : node.content ? 400 : 600, color: isActive ? "#00588F" : isTop ? "#002447" : "#444", backgroundColor: isActive ? "#e8f4fa" : "transparent", borderRight: isActive ? "3px solid #00588F" : "3px solid transparent", marginTop: isTop ? 8 : 0 }}>
      {isTop && node.icon && <span style={{ marginRight: 8, fontSize: 15 }}>{node.icon}</span>}
      <span style={{ flex: 1, textAlign: "left" }}>{node.label}</span>
      {hasChildren && <span style={{ fontSize: 10, opacity: 0.5, transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s", display: "inline-block" }}>▶</span>}
    </button>
    {hasChildren && isExpanded && node.children.map((c) => <SidebarNode key={c.id} node={c} depth={depth + 1} activeId={activeId} onSelect={onSelect} expandedSections={expandedSections} toggleSection={toggleSection} />)}
  </div>;
}

// ─── Search ──────────────────────────────────────────────────────────────────
function SearchOverlay({ onClose, onSelect, flatNodes }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); const h = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);
  const contentNodes = getAllContentNodes(flatNodes);
  const results = useMemo(() => {
    if (!query.trim()) return contentNodes.slice(0, 10);
    const q = query.toLowerCase();
    return contentNodes.filter((node) => {
      const c = CONTENT[node.content] || DEFAULT_CONTENT;
      return [node.label, c.title, ...(c.tags || [])].join(" ").toLowerCase().includes(q) || c.body.map(b => b.text || b.title || "").join(" ").toLowerCase().includes(q);
    });
  }, [query, contentNodes]);
  return <div style={styles.searchOverlay} onClick={onClose}><div style={styles.searchModal} onClick={(e) => e.stopPropagation()}>
    <div style={styles.searchInputWrap}><span style={{ fontSize: 18, color: "#888" }}>⌕</span><input ref={inputRef} style={styles.searchInput} placeholder="Search documentation..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd style={styles.kbd}>ESC</kbd></div>
    <div style={styles.searchResults}>{results.length === 0 && <div style={styles.searchEmpty}>No results for "{query}"</div>}{results.map((node) => { const c = CONTENT[node.content] || DEFAULT_CONTENT; return <button key={node.id} style={styles.searchResult} onClick={() => { onSelect(node.id); onClose(); }}><span style={styles.searchResultTitle}>{c.title || node.label}</span><span style={styles.searchResultPath}>{getBreadcrumbs(node.id, flatNodes).map((x) => x.label).join(" → ")}</span></button>; })}</div>
  </div></div>;
}
function TableOfContents({ content }) {
  const h = content.body.filter((b) => b.type === "heading");
  if (!h.length) return null;
  return <div style={styles.toc}><div style={styles.tocTitle}>On this page</div>{h.map((x, i) => <div key={i} style={styles.tocItem}>{x.text}</div>)}</div>;
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function DocsPortal() {
  const [activeId, setActiveId] = useState("mob-overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState(new Set(["srx-pro-mobile", "mob-install", "mob-connections", "mob-live-view", "mob-settings", "mob-features", "vpc", "vpc-getting-started", "vpc-servers", "vpc-cameras", "vpc-live", "vpc-search", "vpc-backup", "vpc-player"]));
  const [productDrop, setProductDrop] = useState(null);
  const dropRef = useRef(null);
  const flatNodes = useMemo(() => flattenTree(PRODUCT_TREE), []);
  const toggleSection = useCallback((id) => { setExpandedSections((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }); }, []);
  const handleSelect = useCallback((id) => { const node = flatNodes.find((n) => n.id === id); if (node?.content) { setActiveId(id); let cur = node; setExpandedSections((p) => { const n = new Set(p); while (cur?.parent) { n.add(cur.parent); cur = flatNodes.find((x) => x.id === cur.parent); } return n; }); } }, [flatNodes]);
  useEffect(() => { const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, []);
  useEffect(() => { const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setProductDrop(null); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const activeNode = flatNodes.find((n) => n.id === activeId);
  const content = CONTENT[activeNode?.content] || DEFAULT_CONTENT;
  const breadcrumbs = getBreadcrumbs(activeId, flatNodes);
  const contentNodes = getAllContentNodes(flatNodes);
  const idx = contentNodes.findIndex((n) => n.id === activeId);
  const prev = idx > 0 ? contentNodes[idx - 1] : null;
  const next = idx < contentNodes.length - 1 ? contentNodes[idx + 1] : null;

  return <div style={styles.root}>
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}><span style={{ fontSize: 18 }}>{sidebarOpen ? "◀" : "☰"}</span></button>
        <div style={styles.logoArea}><span style={styles.logoText}>i3</span><span style={styles.logoSub}>Docs</span></div>
      </div>
      <button style={styles.searchTrigger} onClick={() => setSearchOpen(true)}><span style={{ opacity: 0.5 }}>⌕</span><span style={{ flex: 1, textAlign: "left", opacity: 0.5 }}>Search docs...</span><kbd style={styles.kbdSmall}>⌘K</kbd></button>
      <div style={styles.headerRight} ref={dropRef}>
        <div style={{ position: "relative" }}>
          <button onClick={() => setProductDrop(productDrop === "srx" ? null : "srx")} style={{ ...styles.versionBadge, cursor: "pointer", border: productDrop === "srx" ? "1px solid #00588F" : "1px solid transparent", display: "flex", alignItems: "center", gap: 4 }}>SRX-Pro <span style={{ fontSize: 8, opacity: 0.6 }}>▼</span></button>
          {productDrop === "srx" && <div style={styles.dropdown}>
            <div style={styles.dropHeader}>SRX-Pro Mobile App</div>
            <button style={styles.dropItem} onClick={() => { handleSelect("mob-overview"); setProductDrop(null); }}>v7.x (Current)</button>
            <button style={{ ...styles.dropItem, opacity: 0.5 }}>v10.x (Coming Soon)</button>
          </div>}
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setProductDrop(productDrop === "vpc" ? null : "vpc")} style={{ ...styles.versionBadge, cursor: "pointer", border: productDrop === "vpc" ? "1px solid #00588F" : "1px solid transparent", display: "flex", alignItems: "center", gap: 4 }}>VPC <span style={{ fontSize: 8, opacity: 0.6 }}>▼</span></button>
          {productDrop === "vpc" && <div style={styles.dropdown}>
            <div style={styles.dropHeader}>Video Pilot Client</div>
            <button style={styles.dropItem} onClick={() => { handleSelect("vpc-overview"); setProductDrop(null); }}>v7.3 (Current)</button>
            <button style={{ ...styles.dropItem, opacity: 0.5 }}>v6.x (Legacy)</button>
          </div>}
        </div>
      </div>
    </header>
    <div style={styles.body}>
      {sidebarOpen && <nav style={styles.sidebar}><div style={styles.sidebarScroll}>{PRODUCT_TREE.map((node) => <SidebarNode key={node.id} node={node} depth={0} activeId={activeId} onSelect={handleSelect} expandedSections={expandedSections} toggleSection={toggleSection} />)}</div></nav>}
      <main style={styles.main}>
        <div style={styles.contentArea}>
          <div style={styles.breadcrumbs}>{breadcrumbs.map((c, i) => <span key={c.id}><button style={i === breadcrumbs.length - 1 ? styles.breadcrumbActive : styles.breadcrumbLink} onClick={() => handleSelect(c.id)}>{c.label}</button>{i < breadcrumbs.length - 1 && <span style={styles.breadcrumbSep}>/</span>}</span>)}</div>
          <h1 style={styles.pageTitle}>{content.title}</h1>
          <div style={styles.meta}><span>Updated: {content.updated}</span><span style={styles.metaDot}>·</span><span>{content.readTime} read</span>{content.tags?.length > 0 && <>{content.tags.map((t) => <span key={t} style={styles.tag}>{t}</span>)}</>}</div>
          <div style={styles.contentBody}>{content.body.map((b, i) => <ContentBlock key={i} block={b} />)}</div>
          <div style={styles.prevNext}>
            {prev ? <button style={styles.prevNextBtn} onClick={() => handleSelect(prev.id)}><span style={styles.prevNextLabel}>← Previous</span><span style={styles.prevNextTitle}>{(CONTENT[prev.content] || DEFAULT_CONTENT).title}</span></button> : <div />}
            {next ? <button style={{ ...styles.prevNextBtn, textAlign: "right" }} onClick={() => handleSelect(next.id)}><span style={styles.prevNextLabel}>Next →</span><span style={styles.prevNextTitle}>{(CONTENT[next.content] || DEFAULT_CONTENT).title}</span></button> : <div />}
          </div>
          <div style={styles.feedback}><span style={{ fontSize: 13, color: "#666" }}>Was this page helpful?</span><button style={styles.feedbackBtn}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:4,verticalAlign:"middle"}}><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>Yes</button><button style={styles.feedbackBtn}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:4,verticalAlign:"middle"}}><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>No</button></div>
        </div>
        <TableOfContents content={content} />
      </main>
    </div>
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onSelect={handleSelect} flatNodes={flatNodes} />}
  </div>;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  root: { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9fb", color: "#002447", fontSize: 15, lineHeight: 1.7 },
  header: { display: "flex", alignItems: "center", height: 56, borderBottom: "1px solid #dde1e6", backgroundColor: "#fff", padding: "0 20px", gap: 16, flexShrink: 0, zIndex: 10 },
  headerLeft: { display: "flex", alignItems: "center", gap: 10 },
  menuBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 4, color: "#002447", display: "flex", alignItems: "center" },
  logoArea: { display: "flex", alignItems: "baseline", gap: 6 },
  logoText: { fontWeight: 800, fontSize: 24, color: "#002447", letterSpacing: "-0.03em" },
  logoSub: { fontSize: 14, color: "#00588F", fontWeight: 500, letterSpacing: "0.02em" },
  searchTrigger: { flex: 1, maxWidth: 480, display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", border: "1px solid #dde1e6", borderRadius: 8, background: "#f4f5f7", cursor: "pointer", fontSize: 14, color: "#888" },
  kbdSmall: { fontSize: 10, padding: "2px 5px", borderRadius: 3, border: "1px solid #ddd", backgroundColor: "#eee", color: "#888", fontFamily: "monospace" },
  headerRight: { display: "flex", alignItems: "center", gap: 8 },
  versionBadge: { fontSize: 12, padding: "4px 12px", borderRadius: 6, backgroundColor: "#e8f4fa", color: "#00588F", fontWeight: 600, border: "1px solid transparent" },
  dropdown: { position: "absolute", top: "calc(100% + 6px)", right: 0, minWidth: 190, backgroundColor: "#fff", borderRadius: 10, border: "1px solid #dde1e6", boxShadow: "0 8px 24px rgba(0,36,71,0.12)", zIndex: 50, overflow: "hidden", padding: "4px 0" },
  dropHeader: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#888", padding: "8px 14px 4px", pointerEvents: "none" },
  dropItem: { display: "block", width: "100%", padding: "8px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 13, color: "#002447", textAlign: "left", fontWeight: 500 },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 268, borderRight: "1px solid #dde1e6", backgroundColor: "#fff", flexShrink: 0, display: "flex", flexDirection: "column" },
  sidebarScroll: { flex: 1, overflowY: "auto", padding: "4px 0 20px 0" },
  sidebarItem: { display: "flex", alignItems: "center", width: "100%", padding: "7px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 14, textAlign: "left", lineHeight: 1.5, transition: "all 0.1s", boxSizing: "border-box" },
  main: { flex: 1, display: "flex", overflow: "auto" },
  contentArea: { flex: 1, maxWidth: 800, margin: "0 auto", padding: "28px 44px 60px 44px" },
  breadcrumbs: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, marginBottom: 16, fontSize: 13 },
  breadcrumbLink: { background: "none", border: "none", color: "#00588F", cursor: "pointer", fontSize: 13, padding: "2px 4px", borderRadius: 3, textDecoration: "none" },
  breadcrumbActive: { background: "none", border: "none", color: "#002447", fontWeight: 600, fontSize: 13, padding: "2px 4px", cursor: "default" },
  breadcrumbSep: { color: "#bbb", margin: "0 3px", fontSize: 12 },
  pageTitle: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px 0", color: "#002447", lineHeight: 1.25 },
  meta: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 13, color: "#777", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #eee" },
  metaDot: { color: "#ccc" },
  tag: { fontSize: 11, padding: "2px 8px", borderRadius: 3, backgroundColor: "#e8f4fa", color: "#00588F", fontWeight: 500, marginLeft: 4 },
  contentBody: { display: "flex", flexDirection: "column", gap: 0 },
  intro: { fontSize: 17, lineHeight: 1.75, color: "#333", marginBottom: 24 },
  h2: { fontSize: 21, fontWeight: 700, margin: "36px 0 14px 0", color: "#002447", letterSpacing: "-0.01em" },
  paragraph: { fontSize: 15, lineHeight: 1.75, color: "#333", margin: "0 0 16px 0" },
  callout: { borderLeft: "4px solid", borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "14px 0 18px 0" },
  calloutHeader: { display: "flex", alignItems: "center", fontSize: 14, fontWeight: 700, marginBottom: 4, color: "#002447" },
  calloutText: { fontSize: 14, lineHeight: 1.65, margin: 0, color: "#333" },
  list: { margin: "0 0 16px 0", paddingLeft: 24 },
  listItem: { fontSize: 15, lineHeight: 1.75, color: "#333", marginBottom: 5 },
  steps: { listStyle: "none", padding: 0, margin: "0 0 16px 0" },
  stepItem: { display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 0", borderBottom: "1px solid #f0f0f0", fontSize: 15, lineHeight: 1.65, color: "#333" },
  stepNum: { flexShrink: 0, width: 26, height: 26, borderRadius: "50%", backgroundColor: "#00588F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 },
  tableWrap: { overflowX: "auto", margin: "10px 0 22px 0", borderRadius: 8, border: "1px solid #dde1e6" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "11px 16px", backgroundColor: "#f4f5f7", fontWeight: 700, borderBottom: "1px solid #dde1e6", color: "#002447", fontSize: 12, letterSpacing: "0.03em", textTransform: "uppercase" },
  td: { padding: "11px 16px", borderBottom: "1px solid #f0f0f0", color: "#333" },
  trAlt: { backgroundColor: "#f8f9fb" },
  codeWrap: { borderRadius: 8, overflow: "hidden", margin: "10px 0 22px 0", border: "1px solid #dde1e6" },
  codeHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px", backgroundColor: "#f4f5f7", borderBottom: "1px solid #dde1e6" },
  codeLang: { fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" },
  copyBtn: { fontSize: 11, padding: "3px 10px", borderRadius: 4, border: "1px solid #ddd", background: "#fff", cursor: "pointer", color: "#666" },
  pre: { margin: 0, padding: "16px 18px", backgroundColor: "#002447", color: "#d4dbe6", fontSize: 14, lineHeight: 1.55, overflowX: "auto", fontFamily: "'Helvetica Neue', Consolas, monospace" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "10px 0 22px 0" },
  gridCard: { display: "flex", flexDirection: "column", gap: 6, padding: "18px", borderRadius: 8, border: "1px solid #dde1e6", backgroundColor: "#fff" },
  gridTitle: { fontSize: 15, fontWeight: 700, color: "#00588F" },
  gridDesc: { fontSize: 14, color: "#002447", lineHeight: 1.55 },
  tabsWrap: { margin: "10px 0 22px 0", border: "1px solid #dde1e6", borderRadius: 8, overflow: "hidden" },
  tabBar: { display: "flex", borderBottom: "1px solid #dde1e6", backgroundColor: "#f4f5f7" },
  tab: { padding: "9px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 14, transition: "all 0.15s" },
  prevNext: { display: "flex", justifyContent: "space-between", gap: 16, marginTop: 44, paddingTop: 22, borderTop: "1px solid #eee" },
  prevNextBtn: { background: "none", border: "1px solid #dde1e6", borderRadius: 8, padding: "14px 18px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, minWidth: 180 },
  prevNextLabel: { fontSize: 12, color: "#888", fontWeight: 500 },
  prevNextTitle: { fontSize: 15, fontWeight: 600, color: "#00588F" },
  feedback: { display: "flex", alignItems: "center", gap: 10, marginTop: 22, padding: "16px 0", borderTop: "1px solid #eee" },
  feedbackBtn: { fontSize: 13, padding: "5px 14px", borderRadius: 6, border: "1px solid #dde1e6", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", color: "#555" },
  toc: { width: 210, flexShrink: 0, padding: "30px 18px", position: "sticky", top: 0, alignSelf: "flex-start", maxHeight: "calc(100vh - 56px)", overflowY: "auto" },
  tocTitle: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", marginBottom: 14 },
  tocItem: { fontSize: 13, color: "#555", padding: "5px 0", cursor: "pointer", lineHeight: 1.5, borderLeft: "2px solid #dde1e6", paddingLeft: 12, marginBottom: 2 },
  searchOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,36,71,0.4)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80, zIndex: 100 },
  searchModal: { width: 580, maxHeight: "60vh", backgroundColor: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,36,71,0.2)", display: "flex", flexDirection: "column", overflow: "hidden" },
  searchInputWrap: { display: "flex", alignItems: "center", padding: "16px 18px", borderBottom: "1px solid #eee", gap: 10 },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: 16, fontFamily: "inherit", color: "#002447" },
  kbd: { fontSize: 10, padding: "2px 6px", borderRadius: 3, border: "1px solid #ddd", backgroundColor: "#eee", color: "#888", fontFamily: "monospace" },
  searchResults: { overflowY: "auto", padding: "8px" },
  searchResult: { display: "flex", flexDirection: "column", gap: 2, width: "100%", padding: "11px 14px", border: "none", background: "none", cursor: "pointer", textAlign: "left", borderRadius: 6 },
  searchResultTitle: { fontSize: 15, fontWeight: 600, color: "#002447" },
  searchResultPath: { fontSize: 12, color: "#888" },
  searchEmpty: { padding: "20px", textAlign: "center", color: "#888", fontSize: 14 },
};