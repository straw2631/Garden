<?php if (!defined('APPLICATION')) exit();

/**
 * Track IP Addresses
 * 
 * The IP Track keeps a sparse record of all IPs used by all users, storing the
 * first and most recent dates for same. It is primarily useful for alt detection
 * and potentially for spambot combat.
 * 
 * @author Tim Gunter <tim@vanillaforums.com>
 * @copyright 2003 Vanilla Forums, Inc
 * @license http://www.opensource.org/licenses/gpl-2.0.php GPL
 * @package Garden
 * @since 2.1
 */

class IpTrackModel extends Gdn_Model {
   
   /**
    * Track use of an IP for this user
    * 
    * @param string $IPAddress Tracked IP
    * @param integer $UserID Tracked UserID
    */
   public function Track($IPAddress, $UserID) {
      $IpLog = array(
         'UserID'    => $UserID,
         'IPAddress' => $IPAddress,
         'IPLong'    => ip2long($IPAddress)
      );
      return $this->Save($IpLog);
   }
   
   /**
    * Get all IPs for given user
    * 
    * @param integer $UserID
    */
   public function GetIPsForUser($UserID) {
      $IPs = $this->Select('IpAddress')
               ->From('IpTrack')
               ->Where('UserID', $UserID)
               ->Get()->ResultArray();
      
      return ConsolidateArrayValuesByKey($IPs, 'IpAddress');
   }
   
   /**
    * Get all Users for a given IP
    * 
    * @param string $IpAddress
    */
   public function GetUsersForIP($IpAddress) {
      $Users = $this->Select('UserID')
               ->From('IpTrack')
               ->Where('IpAddress', $IpAddress)
               ->Get()->ResultArray();
      
      return ConsolidateArrayValuesByKey($Users, 'UserID');
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