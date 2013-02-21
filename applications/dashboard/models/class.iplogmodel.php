<?php if (!defined('APPLICATION')) exit();

/**
 * Log IP Addresses
 * 
 * The IP Log keeps a time based record of all the IPs with which users access
 * the site. It is primarily useful for forensic attribution of malicious actions
 * or IDS events.
 * 
 * @author Tim Gunter <tim@vanillaforums.com>
 * @copyright 2003 Vanilla Forums, Inc
 * @license http://www.opensource.org/licenses/gpl-2.0.php GPL
 * @package Garden
 * @since 2.1
 */

class IpLogModel extends Gdn_Model {
   
   /**
    * Log interesting event for an IP+User
    *
    * @param string $Event The event we're logging
    * @param string $IPAddress Tracked IP
    * @param integer $UserID Tracked UserID
    */
   public function Log($Event, $IPAddress, $UserID) {
      $IpLog = array(
         'UserID'    => $UserID,
         'Event'     => $Event,
         'IPAddress' => $IPAddress,
         'IPLong'    => ip2long($IPAddress)
      );
      return $this->Save($IpLog);
   }
   
   /**
    * Log an IP event
    * 
    * @param type $IpLog
    */
   public function Save($IpLog) {
      parent::Save($IpLog);
   }
   
}