const si = require('systeminformation');

interface SysInfo {
  osName: string;
  kernelVer: string;
  sysUptime: string; // in days
  ramAvailable?: string; //gb
  ramTotal: string; // gb
  bootDiskName: string;
  storageCapacity: string;
}

const mergeObjs = (objs: Object[]): SysInfo => {
  const nu = {};
  objs.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      nu[key] = obj[key];
    })
  });
  return nu as SysInfo;
}

const bytes2Gb = (bytes) => `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
const bytes2Tb = (bytes) => `${(bytes / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;

const calcRam = (rams) => {
  let total = 0;
  rams.forEach((ram) => total += ram.size);
  return bytes2Gb(total);
};

const getInfo = (): Promise<any> => {
  const os = si.osInfo().then((data) => {
    return {
      osName: data.distro,
      kernelVer: data.kernel
    };
  });
  const disk = si.getStaticData().then((data) => {
    return {
      bootDiskName: data.diskLayout[0].name,
      storageCapacity: bytes2Tb(data.diskLayout[0].size),
      ramTotal: calcRam(data.memLayout)
    };
  });
  // @ts-ignore
  return Promise.all([os, disk])
};

const getUptime = () => {
  const seconds = Math.abs(si.time().uptime);
  const days = seconds / 60 / 60 / 24;
  return `${days.toFixed(2)} days`;
};

const reply = (msg) => {
  return getInfo().then((data) => {
    const info: SysInfo = mergeObjs(data.concat({ sysUptime: getUptime() }));
    const embed = {
      color: 3447003,
      title: "System Information",
      description: "System information about the machine on which the bot is running.",
      fields: [{
          name: "Operating system",
          value: `${info.osName}`
        },
        {
          name: "Kernel version",
          value: `${info.kernelVer}`
        },
        {
          name: "Uptime",
          value: info.sysUptime
        },
        {
          name: "RAM",
          value: info.ramTotal
        },
        {
          name: `Storage (${info.bootDiskName})`,
          value: info.storageCapacity
        }
      ],
      timestamp: new Date(),
    };

    msg.channel.send({embed});
  });
};

export default { reply };